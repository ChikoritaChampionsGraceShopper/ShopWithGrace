import React from 'react';
import { Link } from 'react-router-dom';

const Product = (props) => {
  const product = props.product;

  return (
    <div key={product.id} className='productContainer'>
      <div>
        <div>
          <div>
            <img src={product.image} style={{ width: '200px', height: '200px' }} />
            <div className='nameAndPrice'>
              <div className='productName'>{product.name}</div>
              <div className='productPrice'>${product.price}</div>
            </div>
            <div className='productInventory'>isInStock Goes here</div>
            </div>
        </div>
      </div>

      {/* <h3>{product.name}</h3>
      <h3>{product.price}</h3>
      <h3>{product.description}</h3>
      <h3>{product.origin}</h3>
      <h3>{product.category}</h3>
      <br /> */}
    </div>
  );
};

export default Product;
