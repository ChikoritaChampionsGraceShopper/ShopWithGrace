import axios from 'axios';
import React, { useEffect, useContext } from 'react';
import FeaturedProducts from './FeatureProducts';
import { useProducts } from './ProductsProvider';
import Product from './Product';
import { Link } from 'react-router-dom';
import { CartContext, useCart } from './Cart/CartProvider';

const HomePage = () => {
  const { products, isLoading, mapArr, setSingleProduct } = useProducts();
  const { addToCart } = useContext(CartContext);
  console.log(mapArr);

  return (
    <div>
      <section className='hero is-white'>
        <div className='hero-body'>
          <p className='title'>Welcome to Chao's Teas!</p>
          <p className='subtitle'>
            I don't know why it's boujee, but it is cool
          </p>
          <img
            src='https://www.aicr.org/wp-content/uploads/2020/06/peppermint-tea-on-teacup-1417945-1200x826.jpg.webp'
            width='50%'
          />
        </div>
        <div>
          {mapArr[0] === undefined ? (
            <div>Loading Data</div>
          ) : (
            <div>
              <h1>Recommendation</h1>
              {mapArr.map((item) => {
                return (
                  <div key={item.id}>
                    <Link
                      to={`/products/${item.id}`}
                      onClick={() => setSingleProduct(item.id)}
                    >
                      <Product product={item} />
                      <button onClick={() => addToCart(item)}>
                        Add to Cart
                      </button>
                      <br />
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;

// useEffect(() => {
//   return () => {};
// }, []);
