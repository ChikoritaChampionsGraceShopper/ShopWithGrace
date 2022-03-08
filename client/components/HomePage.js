import axios from "axios";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useCart } from "./Cart/CartProvider";
import { Link } from "react-router-dom";
import Recommendation from './Recommendation';
import { useProducts } from "./ProductsProvider";

const HomePage = () => {
  const { fetchCart } = useCart();
  const {fetchProducts} = useProducts()
  let id = 0
  const isLoggedIn = useSelector((state) => {
    id = state.auth.id;
    return !!state.auth.id;
  });
  useEffect(() => {
    if (id) fetchCart(id)
    fetchProducts()
  },[])


  return (
    <div>
      <section className="hero is-info is-large hero-image">
        <div className="hero-body ">
          <div className="container">
            <h1 className="hero-title">
              I don't know why it's boujee, but it is cool!
            </h1>
            <div className="shop-now-btn">
              <Link
                to={`/products`}>
                <button className="button is-black" id="shop-now">
                  SHOP NOW
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Recommendation />
    </div>
  );
};

export default HomePage;
