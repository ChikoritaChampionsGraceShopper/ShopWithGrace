import axios from 'axios'
import React, {useReducer, useContext, createContext, useEffect, useState} from 'react'
import history from 'history'

const SHOW_CART = 'SHOW_CART'
const EDIT_CART = 'EDIT_CART'
const CLEAR_CART = 'CLEAR_CART'
const GRAB_CART = 'GRAB_CART'

export const CartContext = createContext()

export function useCart() {
  const { isLoading, setisLoading, dispatch } = useContext(CartContext)


  return {
    isLoading,
    setisLoading,
    async updateCart(orderId, productId, quantity) {
      await axios.put(`/api/orderdetails/${orderId}`, {productId, quantity})
      dispatch({ type: EDIT_CART, productId, quantity })
    },
    async fetchCart(id) {
      const { data: order } = await axios.get(`/api/orderdetails/${id}`)
      dispatch({ type: SHOW_CART, order })
      setisLoading(false)
    },
    async grabLocaLStorageMerge(pastCart, cartFromLocalStorage) {
          dispatch({type: GRAB_CART, pastCart, cartFromLocalStorage})
    }
  }
}

const reducer = (state, action) => {
  console.log('state: ', state)
  console.log('action: ', action)
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

  // const localCartStorage = localStorage.getItem('order') ?
  // JSON.parse(localStorage.getItem('order')) : [];

  const initialState = { cartItems: [], itemCount: 0, total: 0 }

export default function CartProvider({children}) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [isLoading, setisLoading] = useState(true)
  const editCart = (payload) => { dispatch({type: EDIT_CART, payload})}
  const clearCart = () => { dispatch({type: CLEAR_CART })}

  // const addToLocalStorage = (cartItems) => {
  //   const order = cartItems.length > 0 ? cartItems : [];
  //   localStorage.setItem('order', JSON.stringify(order));
  // }

  // const sumItems = (cartItems) => {
  //   addToLocalStorage(cartItems)
  //   return {
  //     itemCount: cartItems.reduce((total, product) => total + product.quantity, 0),
  //     total: cartItems.reduce((total, product) => total + product.price * product.quntity, 0)
  //   }
  // }

  const contextValue = {
    ...state,
    // sumItems,
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
