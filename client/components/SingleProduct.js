import React, { useContext, useEffect } from 'react'
import { ProductsContext, useProducts } from './ProductsProvider'
import Product from './Product'
import { useSelector } from 'react-redux'
import { useCart } from './Cart/CartProvider'

const SingleProduct = ({match}) => {
  const { isLoading, setSingleProduct } = useProducts()
  let userId = 0
  const { updateCart } = useCart()
  const { id } = match.params
  const isLoggedIn = useSelector((state) => {
    userId = state.auth.id;
    return !!state.auth.id;
  });
  const state = useContext(ProductsContext)
  let product = state.product
  useEffect(() => {
    setSingleProduct(id);
  }, []);
  console.log(state)
  function handleUpdate() {
    updateCart(userId, product.id, 1)
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
  );
};

export default SingleProduct;
