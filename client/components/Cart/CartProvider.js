import axios from 'axios'
import React, {useReducer, useContext, createContext, useEffect, useState} from 'react'

const SHOW_CART = 'SHOW_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const ADD_ITEM = 'ADD_TO_CART'
const INCREASE_ITEM = 'INCREASE_ITEM'
const DECREASE_ITEM = 'DECREASE_ITEM'
const CLEAR_CART = 'CLEAR_CART'

export const CartContext = createContext()

export function useCart() {
  const { cart, isLoading, setisLoading, dispatch } = useContext(CartContext)

  return {
    cart,
    isLoading,
    setisLoading,
    async fetchCart(id) {
      const { data: cart } = await axios.get(`/api/cart/${id}`)
      dispatch({ type: SHOW_CART, cart })
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
      return { ...state, products: action.products }
    }
    case ADD_ITEM: {
      if(!state.cartItems.find(item => item.id === action.payload.id)) {
        state.cartItems.push({
          ...action.payload,
          quantity: 1,
        });
      }
      return {
        ...state,
        cartItems: [...state.cartItems],
        itemCount: state.cartItems.reduce((total, product) => total + product.quantity, 0),
        total: state.cartItems.reduce((total, product) => total + product.price * product.quantity, 0)
      }
    }
    case INCREASE_ITEM: {
      const increaseIdx = state.cartItems.findIndex(item => item.id === action.payload.id)
      state.cartItems[increaseIdx].quantity++
      return {
        ...state,
        cartItems: [...state.cartItems],
        ...sumItems(state.cartItems)
      }
    }
    case DECREASE_ITEM: {
      const decreaseIndex = state.cartItems.findIndex(item => item.id === action.payload.id);
      const product = state.cartItems[decreaseIndex];
      if (product.quantity !== 0 && product.quantity !== 1) {
        product.quantity--;
      }
      return {
        ...state,
        cartItems: [...state.cartItems],
        ...sumItems(state.cartItems),
      }
    }
    case REMOVE_FROM_CART : {
      const adjustedCart = state.cartItems.filter(item => item.id !== action.payload.id)
      return {
        ...state,
        carttItems: [...adjustedCart],
        ...sumItems(adjustedCart)
      }
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
  const addToCart = (payload) => { dispatch({type: ADD_ITEM, payload})}
  const removeFromCart = (payload) => { dispatch({type: REMOVE_FROM_CART, payload})}
  const increaseItemQuantity = (payload) => { dispatch({type: INCREASE_ITEM, payload})}
  const decreaseItemQuantity = (payload) => { dispatch({type: DECREASE_ITEM, payload})}
  const clearCart = () => { dispatch({type: CLEAR_CART })}

  // useEffect(() => {
  //   async function fetchCart(id) {
  //     const { data: cart } = await axios.get(`/api/carts/${id}`)
  //     dispatch({ type: SHOW_CART, cart })
  //     setisLoading(false)
  //   }
  //   fetchCart()
  // }, [])

  const contextValue = {
    total: state.total,
    cart: state.cart,
    addToCart,
    removeFromCart,
    increaseItemQuantity,
    decreaseItemQuantity,
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
