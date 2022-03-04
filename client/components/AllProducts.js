import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { useProducts } from './ProductsProvider'
import Product from './Product'

const AllProducts = () => {
  const { products, isLoading, setSingleProduct } = useProducts()
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
        </div>
        ))
        }
    </div>
    )
}

export default AllProducts
