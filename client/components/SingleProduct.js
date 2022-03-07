import React, { useContext, useEffect } from 'react'
import { useProducts } from './ProductsProvider'
import Product from './Product'
import { CartContext } from './Cart/CartProvider'

const SingleProduct = ({match}) => {
  const { product, isLoading, setSingleProduct } = useProducts()
  const { addToCart } = useContext(CartContext)
  const { id } = match.params

  useEffect(() => {
    setSingleProduct(id)
  }, [])

  return (
    <div className="singleProductContainer" key={product.id} >
    { isLoading
      ? <div className='loading'>Loading Product...</div>
      : <div className='singleProductCard'>
        <Product product={product} />
      <div className="singleProductDescription" >
        {product.description}
      <button onClick={() => addToCart(product)} >Add to Cart</button>
        </div>
      </div>
      }
  </div>
  )
}

export default SingleProduct
