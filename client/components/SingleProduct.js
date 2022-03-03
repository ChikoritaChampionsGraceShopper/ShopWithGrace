import React from 'react'
import { Link } from 'react-router-dom'
import { useProducts } from './ProductsProvider'
import Product from './Product'

const SingleProduct = () => {
  const { product, isLoading } = useProducts()

  return (
    <div id="single-product" key={product.id} >
    { isLoading
      ? <div className='loading'>Loading Product...</div>
      : <Product product={product} />
      }
  </div>
  )
}

export default SingleProduct
