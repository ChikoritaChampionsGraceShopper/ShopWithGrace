import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { useProducts } from './ProductsProvider'

const AllProducts = () => {
  const { products, isLoading } = useProducts()
// console.log(products)
  return (
    <div id='products' className='column'>
      { isLoading
        ? <div className='loading'>Loading Products...</div>
        : products.map(product => (
          <div key={product.id} className='product' >
            <Link to={`/products/${product.id}`}>
              <h3>{product.name}</h3>
              <h3>{product.price}</h3>
              <img src={product.image} />
              <h3>{product.description}</h3>
              <h3>{product.origin}</h3>
              <h3>{product.category}</h3>
            </Link>
            <hr />
          </div>
        ))
      }
    </div>
  )
}

export default AllProducts
