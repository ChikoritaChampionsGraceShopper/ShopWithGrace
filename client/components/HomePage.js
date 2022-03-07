import axios from "axios";
import React, { useEffect, useContext } from "react";
import FeaturedProducts from "./FeatureProducts";
import { useProducts } from "./ProductsProvider";
import Product from "./Product";
import { Link } from "react-router-dom";
import { CartContext, useCart } from "./Cart/CartProvider";
import Recommendation from './Recommendation';

const HomePage = () => {
  const { products, isLoading, mapArr, setSingleProduct } = useProducts();
  const { addToCart } = useContext(CartContext);

  return (
    <div>
      <section className="hero is-info is-large hero-image">
        <div className="hero-body ">
          <div className="container">
            <h1 className="hero-title">
              I don't know why it's boujee, but it is cool!
            </h1>
            <div className="shop-now-btn">
              <button className="button is-black" id="shop-now">
                SHOP NOW
              </button>
            </div>
          </div>
        </div>
      </section>
      <Recommendation />
    </div>
  );
};

export default HomePage;

// useEffect(() => {
//   return () => {};
// }, []);
