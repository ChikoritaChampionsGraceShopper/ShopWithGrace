import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { useProducts } from './ProductsProvider';
import Product from './Product';
import { useCart } from './Cart/CartProvider';

const AllProducts = () => {
  const { products, isLoading, setSingleProduct, fetchProducts } = useProducts();
  let userId = 0
  const isLoggedIn = useSelector((state) => {
    userId = state.auth.id;
    return !!state.auth.id;
  });
  const { updateCart } = useCart()
  useEffect(() => {
    fetchProducts()
  },[])

  function handleUpdate(productId) {
    updateCart(userId, productId, 1)
  }

  return (
    <div className="allProductsContainer">
      {isLoading ? (
        <div className="loading">Loading Products...</div>
      ) : (
        products.map((product) => (
          <div className="productCardOutline" key={product.id}>
            <div>
              <Product product={product} key={product.id} />
            <Link
              to={`/products/${product.id}`}
              onClick={() => setSingleProduct(product.id)}
            >View Product
            </Link>
            </div>
            <button onClick={() => handleUpdate(product.id)}>Add to Cart</button>
          </div>
        ))
      )
      }
    </div>
  );
};

export default AllProducts;
