import React from 'react'
import {Link} from 'react-router-dom'

const Product = (props) => {
  const product = props.product
  const pickProduct = props.pickProduct

  return (
    <div key={product.id} className='product' >
      <Link to={`/products/${product.id}`} onClick={() => pickProduct && pickProduct(product.id)} >
        <h3>{product.name}</h3>
        <h3>{product.price}</h3>
        <img src={product.image} />
        <h3>{product.description}</h3>
        <h3>{product.origin}</h3>
        <h3>{product.category}</h3>
      </Link>
      <hr />
    </div>
  )
}

export default Product