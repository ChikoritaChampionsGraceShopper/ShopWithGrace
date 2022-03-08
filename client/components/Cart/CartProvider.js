import axios from 'axios'
import React, {useReducer, useContext, createContext, useEffect, useState} from 'react'

const SHOW_CART = 'SHOW_CART'
const EDIT_CART = 'EDIT_CART'
const CLEAR_CART = 'CLEAR_CART'

export const CartContext = createContext()

export function useCart() {
  const { order, isLoading, setisLoading, dispatch } = useContext(CartContext)

  function addToCart(itemId, quantity) {
    const oldCart = JSON.parse(window.localStorage.getItem('order'));
    let payload = {}
    if (!oldCart) payload = { [itemId]: 1}
    else {
      payload = oldCart
      if (oldCart[itemId]) payload[itemId] += quantity
      else {
          payload[itemId] = 1
        }
    }
    window.localStorage.setItem('order', JSON.stringify(payload))
    dispatch({ type: EDIT_CART, payload })
  }

  return {
    isLoading,
    setisLoading,
    addToCart,
    async updateCart(orderId) {
      const localStorageOrder = JSON.parse(window.localStorage.getItem('order'))
      const { order } = await axios.put(`/api/orderdetails/${orderId}`, localStorageOrder)
      dispatch({ type: EDIT_CART, order })
    },
    async fetchCart(id) {
      const { data: order } = await axios.get(`/api/orderdetails/${id}`)
      dispatch({ type: SHOW_CART, order })
      setisLoading(false)
    }
  }
}

const addToLocalStorage = (cartItems) => {
  const order = cartItems.length > 0 ? cartItems : [];
  localStorage.setItem('order', JSON.stringify(order));
}

export const sumItems = (cartItems) => {
  addToLocalStorage(cartItems)
  return {
    itemCount: cartItems.reduce((total, product) => total + product.quantity, 0),
    total: cartItems.reduce((total, product) => total + product.price * product.quantity, 0)
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
      return { ...state, cartItems: action.payload}
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

  const localCartStorage = localStorage.getItem('order') ?
  JSON.parse(localStorage.getItem('order')) : [];

  const initialState = { cartItems: localCartStorage, itemCount: 0, total: 0 }

export default function CartProvider({children}) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [isLoading, setisLoading] = useState(true)
  const editCart = (payload) => { dispatch({type: ADD_ITEM, payload})}
  const clearCart = () => { dispatch({type: CLEAR_CART })}

  const contextValue = {
    ...state,
    total: state.total,
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
