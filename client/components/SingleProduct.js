import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useProducts } from './ProductsProvider'
import Product from './Product'
import { CartContext, useCart } from './Cart/CartProvider'

const SingleProduct = ({match}) => {
  const { product, isLoading, setSingleProduct } = useProducts()
  const { addToCart } = useContext(CartContext)
  const { id } = match.params

  useEffect(() => {
    setSingleProduct(id)
  }, [])

  return (
    <div id="single-product" key={product.id} >
    { isLoading
      ? <div className='loading'>Loading Product...</div>
      : <><Product product={product} />
      <button onClick={() => addToCart(product)} >Add to Cart</button>
      </>
      }
  </div>
  )
}

export default SingleProduct
