import axios from 'axios'
import React, {useReducer, useContext, createContext, useEffect, useState} from 'react'

const SHOW_CART = 'SHOW_CART'
const EDIT_CART = 'EDIT_CART'
const CLEAR_CART = 'CLEAR_CART'

export const CartContext = createContext()

export function useCart() {
  const { cart, isLoading, setisLoading, dispatch } = useContext(CartContext)

  return {
    cart,
    isLoading,
    setisLoading,
    async updateCart(orderId) {
      const localStorageOrder = JSON.parse(window.localStorage.getItem('order'))
      const { data } = await axios.put(`/api/orderdetails/${orderId}`, localStorageOrder)
      dispatch({ type: EDIT_CART, data })
    },
    async fetchCart(id) {
      const { data: order } = await axios.get(`/api/orderdetails/${id}`)
      dispatch({ type: SHOW_CART, order })
      setisLoading(false)
    }
  }
}

const addToLocalStorage = (cartItems) => {
  const cart = cartItems.length > 0 ? cartItems : [];
  localStorage.setItem('cart', JSON.stringify(cart));
}

export const sumItems = (cartItems) => {
  addToLocalStorage(cartItems)
  return {
    itemCount: cartItems.reduce((total, product) => total + product.quantity, 0),
    total: cartItems.reduce((total, product) => total + product.price * product.quntity, 0)
  }
}

const reducer = (state, action) => {
  console.log('state: ', state)
  console.log('action: ', action)
  switch(action.type) {
    case SHOW_CART: {
      return { ...state, order: action.order, cartItems: [...action.order.products ] }
    }
    case EDIT_CART: {
      return { ...state, order: [...action.payload]}
    }
    case CLEAR_CART: {
      localStorage.removeItem('cart');
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

  const localCartStorage = localStorage.getItem('cart') ?
  JSON.parse(localStorage.getItem('cart')) : [];

  const initialState = { cartItems: localCartStorage, itemCount: 0, total: 0 }

export default function CartProvider({children}) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [isLoading, setisLoading] = useState(true)
  const editCart = (payload) => { dispatch({type: ADD_ITEM, payload})}
  const clearCart = () => { dispatch({type: CLEAR_CART })}



  const contextValue = {
    ...state,
    total: state.total,
    cart: state.order,
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
