import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from './ProductsProvider';
import Product from './Product';
import { useCart } from './Cart/CartProvider';

const AllProducts = () => {
  const { products, isLoading, setSingleProduct } = useProducts();
  const { updateCart } = useCart()

  function handleUpdate(productId) {
    updateCart(25, productId, 1)
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
