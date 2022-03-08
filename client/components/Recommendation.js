import axios from "axios";
import React, { useEffect, useContext } from "react";
import FeaturedProducts from "./FeatureProducts";
import { useProducts } from "./ProductsProvider";
import Product from "./Product";
import { Link } from "react-router-dom";
import { CartContext, useCart } from "./Cart/CartProvider";

const Recommendation = () => {
  const { product, mapArr, setSingleProduct } = useProducts();
  const {updateCart} = useCart()
  const state = useContext(CartContext)
  console.log('here is the state!!', state)

  function handleUpdate(product) {
    updateCart(state.order.id, product.id, 1)
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
                  <div key={item.id}>
                    <Link
                      to={`/products/${item.id}`}
                      onClick={() => setSingleProduct(item.id)}
                    >
                      <Product product={item} />
                    </Link>
                    <button onClick={() => handleUpdate(item)}>Add to Cart</button>
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
