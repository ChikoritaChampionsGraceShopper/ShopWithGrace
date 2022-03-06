import axios from 'axios'
import React, {useReducer, useContext, createContext, useEffect, useState} from 'react'

const SHOW_ALL_PRODUCTS = 'SHOW_ALL_PRODUCTS'
const SINGLE_PRODUCT = 'SINGLE_PRODUCT'

const ProductsContext = createContext()

export function useProducts() {
  const { products, isLoading, setisLoading, product, dispatch } = useContext(ProductsContext)

  return {
    products,
    product,
    isLoading,
    async setSingleProduct(productId) {
      const { data: product } = await axios.get(`/api/products/${productId}`)
      dispatch({
        type: SINGLE_PRODUCT,
        product
      })
      setisLoading(false)
    }
  }
}

const reducer = (state, action) => {
  console.log('state: ', state)
  console.log('action: ', action)
  switch(action.type) {
    case SHOW_ALL_PRODUCTS: {
      return { ...state, products: action.products }
    }
    case SINGLE_PRODUCT: {
      return {...state, product: action.product}
    }
    default:
      return state
    }
  }

  const initialState = { products: [], product: {} }

export default function ProductProvider({children}) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [isLoading, setisLoading] = useState(true)

  //AllProducts
  useEffect(() => {
    async function fetchProducts() {
      const { data: products } = await axios.get('/api/products')
      dispatch({ type: SHOW_ALL_PRODUCTS, products })
      setisLoading(false)
    }
    fetchProducts()
  }, [])

  const contextValue = {
    products: state.products,
    product: state.product,
    dispatch,
    setisLoading,
    isLoading
  }
  return (
    <ProductsContext.Provider value={contextValue}>
      {children}
    </ProductsContext.Provider>
  )
}
