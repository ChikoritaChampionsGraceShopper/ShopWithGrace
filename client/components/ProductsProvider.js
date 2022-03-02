import axios from 'axios'
import React, {useReducer, useContext, createContext, useEffect, useState} from 'react'

const SHOW_ALL_PRODUCTS = 'SHOW_ALL_PRODUCTS'

const ProductsContext = createContext()

export function useProducts() {
  const { products, isLoading } = useContext(ProductsContext)
  return { products, isLoading }
}

const reducer = (state, action) => {
  console.log('state: ', state)
  console.log('action: ', action)
  switch(action.type) {
    case SHOW_ALL_PRODUCTS: {
      return { ...state, products: action.products }
    }
    default:
      return state
    }
  }

  const initialState = { products: [], }

export default function ProductProvider({children}) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [isLoading, setisLoading] = useState(true)

  useEffect(() => {
    async function fetchProducts() {
      const { data: products } = await axios.get('/api/products')
      // console.log(products)
      dispatch({
        type: SHOW_ALL_PRODUCTS,
        products
      })
      setisLoading(false)
    }
    fetchProducts()
  }, [])

  const contextValue = {
    products: state.products,
    dispatch,
    isLoading
  }
  return (
    <ProductsContext.Provider value={contextValue}>
      {children}
      </ProductsContext.Provider>
  )
}
