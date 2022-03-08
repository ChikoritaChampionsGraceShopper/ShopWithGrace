import axios from "axios";
import React, { useEffect, useContext } from "react";
import { useSelector } from 'react-redux'
import { useProducts } from "./ProductsProvider";
import Product from "./Product";
import { Link } from "react-router-dom";
import { CartContext, useCart } from "./Cart/CartProvider";

const Recommendation = () => {
  const { mapArr, setSingleProduct } = useProducts();
  let userId = 0
  const isLoggedIn = useSelector((state) => {
    userId = state.auth.id;
    return !!state.auth.id;
  });
  const { updateCart } = useCart();
  const state = useContext(CartContext);

  function handleUpdate(product) {
      updateCart(userId, product.id, 1)
  }

  return (
    <div>
      <div>
        {mapArr[0] === undefined ? (
          <div>Loading Data</div>
        ) : (
          <div>
            <div className="recommended-title">
              <h1>Recommended Products</h1>
            </div>
            <div className="recommended-container">
              {mapArr.map((item) => {
                return (
                  <div key={item.id} className="recommended-product-container">
                    <Link
                      to={`/products/${item.id}`}
                      onClick={() => setSingleProduct(item.id)}
                    >
                      <Product product={item} />
                    </Link>
                    <div>
                      <button
                        className="button is-light"
                        onClick={() => handleUpdate(item)}
                      >
                        Add to Cart
                      </button>
                    </div>
                    <br />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recommendation;
