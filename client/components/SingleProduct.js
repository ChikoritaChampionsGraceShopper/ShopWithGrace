import React from 'react'
import { Link } from 'react-router-dom'
import { useProducts } from './ProductsProvider'

const SingleProduct = () => {
  const { product, isLoading } = useProducts()

  return (
  <div id="single-product" key={product.id} >
    <p>{product.name}</p>
    <p>{product.price}</p>
    <img src={product.image} />
    <p>{product.description}</p>
    <p>{product.origin}</p>
    <p>{product.category}</p>
  </div>
  )
}

export default SingleProduct
