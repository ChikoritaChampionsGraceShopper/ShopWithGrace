import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { ProductsContext, useProducts } from './ProductsProvider';
import Product from './Product';
import { useCart } from './Cart/CartProvider';

const FilteredProducts = ({match}) => {
  const { isLoading, setSingleProduct, setFilteredProducts } = useProducts();
  const { products, filteredProducts } = useContext(ProductsContext)
  let userId = 0
  const isLoggedIn = useSelector((state) => {
    userId = state.auth.id;
    return !!state.auth.id;
  });
  const { updateCart } = useCart()

  useEffect(() => {
    setFilteredProducts(match.params.category)
  }, [match.params])

  function handleUpdate(productId) {
    updateCart(userId, productId, 1)
  }

  return (
    <div className="allProductsContainer">
      {isLoading ? (
        <div className="loading">Loading Products...</div>
      ) : (
        filteredProducts.map((product) => (
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

export default FilteredProducts;
