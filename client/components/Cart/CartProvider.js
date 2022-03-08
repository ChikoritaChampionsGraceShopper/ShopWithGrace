import axios from 'axios'
import React, {useReducer, useContext, createContext, useState} from 'react'

const SHOW_CART = 'SHOW_CART'
const EDIT_CART = 'EDIT_CART'
const CLEAR_CART = 'CLEAR_CART'
const GRAB_CART = 'GRAB_CART'

export const CartContext = createContext()

export function useCart() {
  const { isLoading, setisLoading, dispatch } = useContext(CartContext)

  const sumItems = (cartItems) => {
    let totalItems = 0
    let newValue = 0

    cartItems.forEach(item => {
      totalItems += item.order_details.quantity * 1
      newValue += item.price * item.order_details.quantity
    })
    return {totalItems, newValue}
  }

  async function fetchCart(userId) {
    const { data: order } = await axios.get(`/api/orderdetails/${userId}`)
    dispatch({ type: SHOW_CART, order })
    setisLoading(false)
  }

  async function updateCart(userId, productId, quantity) {
    await axios.put(`/api/orderdetails/${userId}`, {productId, quantity})
    dispatch({ type: EDIT_CART, productId, quantity })
    fetchCart(userId)
  }

  async function clearCart(userId) {
    await axios.delete(`/api/orderdetails/${userId}`)
    dispatch({ type: CLEAR_CART })
    fetchCart(userId)
  }

  return {
    sumItems,
    isLoading,
    setisLoading,
    updateCart,
    fetchCart,
    clearCart,
    async grabLocaLStorageMerge(pastCart, cartFromLocalStorage) {
        dispatch({type: GRAB_CART, pastCart, cartFromLocalStorage})
    }
  }
}

const reducer = (state, action) => {
  switch(action.type) {
    case SHOW_CART: {
      return { ...state, order: action.order }
    }
    case EDIT_CART: {
      if (action.quantity === 0) {
        let newCart = {...state}
        delete newCart[action.productId]
        localStorage.setItem('order', JSON.stringify(newCart))
        return newCart
      }
      let newCart = {...state}
      newCart[action.productId] = action.quantity
      localStorage.setItem('order', JSON.stringify(newCart))
      return newCart
    }
    case GRAB_CART: {
      let newCart = {
        ...state,
        ...action.cartFromLocalStorage,
        ...action.pastCart
      }
      localStorage.setItem('order', JSON.stringify(newCart))
      return newCart
    }
    case CLEAR_CART: {
      localStorage.removeItem('order');
      return {
        cartItems: [],
        itemCount: 0,
        total: 0,
      }
    }
    default:
      return state
    }
  }

  const initialState = { cartItems: [], itemCount: 0, total: 0 }

export default function CartProvider({children}) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [isLoading, setisLoading] = useState(true)
  const editCart = (payload) => { dispatch({type: EDIT_CART, payload})}
  const clearCart = () => { dispatch({type: CLEAR_CART })}

  const contextValue = {
    ...state,
    order: state.order,
    editCart,
    clearCart,
    dispatch,
    setisLoading,
    isLoading
  }
  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  )
}
