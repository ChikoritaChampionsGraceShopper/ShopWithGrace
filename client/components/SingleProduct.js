import React, { useContext, useEffect } from 'react'
import { useProducts } from './ProductsProvider'
import Product from './Product'
import { CartContext, useCart } from './Cart/CartProvider'

const SingleProduct = ({match}) => {
  const { product, isLoading, setSingleProduct } = useProducts()
  const { addToCart, grabLocaLStorageMerge, updateCart } = useCart()
  const { id } = match.params

  useEffect(() => {
    setSingleProduct(id)
  }, [])
  console.log(product.id)

  function handleUpdate() {
    updateCart(25, product.id, 1)
  }

  return (
    <div className="singleProductContainer" key={product.id} >
    { isLoading
      ? <div className='loading'>Loading Product...</div>
      : <div className='singleProductCard'>
        <Product product={product} />
      <div className="singleProductDescription" >
        {product.description}
      <button onClick={() => handleUpdate()} >Add to Cart</button>
        </div>
      </div>
      }
  </div>
  )
}

export default SingleProduct
