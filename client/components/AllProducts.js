import React, {useEffect, useContext} from 'react'
import {Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { useProducts } from './ProductsProvider'
import Product from './Product'
import { CartContext } from './Cart/CartProvider'

const AllProducts = () => {
  const { products, isLoading, setSingleProduct } = useProducts()
  const { addToCart } = useContext(CartContext)
// console.log('products: ', products)
  return (
    <div id='products' className='column'>
      { isLoading
        ? <div className='loading'>Loading Products...</div>
        : products.map(product => (
          <div key={product.id} >
          <Link to={`/products/${product.id}`} onClick={() => setSingleProduct(product.id)} >
          <Product product={product} key={product.id} />
        </Link>
        <button onClick={() => addToCart(product)} >Add to Cart</button>
        </div>
        ))
       }
    </div>
  );
};

export default AllProducts;
