import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useProducts } from './ProductsProvider'
import Product from './Product'

const SingleProduct = ({match}) => {
  const { product, isLoading, setSingleProduct } = useProducts()
  const { id } = match.params

  useEffect(() => {
    setSingleProduct(id)
  }, [])

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
