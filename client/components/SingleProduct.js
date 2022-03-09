import React, { useContext, useEffect } from 'react'
import { ProductsContext, useProducts } from './ProductsProvider'
import { Link } from 'react-router-dom';
import Product from './Product'
import { useSelector } from 'react-redux'
import { useCart } from './Cart/CartProvider'

const SingleProduct = ({match}) => {
  const { isLoading, setSingleProduct } = useProducts()
  const { updateCart } = useCart()
  const { id } = match.params
  const userId = useSelector((state) => state.auth.id);
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
    <div className="singleProductContainer" key={product.id}>
      {isLoading ? (
        <div className="loading">Loading Product...</div>
      ) : (
        <div className="singleProductCard">
          <div>
            <Product product={product} />
          </div>
          <div className="single-product-addToCart">
            <button className="button is-light" onClick={() => handleUpdate()}>
              Add to Cart
            </button>
          </div>
          <div>
            <Link to={`/edit-product/${id}`}>
              <button className="button is-light">Edit Product</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleProduct;
