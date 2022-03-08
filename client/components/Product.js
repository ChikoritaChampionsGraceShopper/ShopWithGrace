import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const Product = (props) => {
  console.log(props);
  const product = props.product;
  let id = 0;
  const isLoggedIn = useSelector((state) => {
    id = state.auth.id;
    return !!state.auth.id;
  });
  const dispatch = useDispatch();

  return (
    <div>
      {isLoggedIn ? (
        <div key={product.id} className='productContainer'>
          <div>
            <div>
              <div>
                <img
                  src={product.image}
                  style={{ width: '200px', height: '200px' }}
                />
                <div className='nameAndPrice'>
                  <div className='productName'>{product.name}</div>
                  <div className='productPrice'>${product.price}</div>
                </div>
                <div className='productInventory'>isInStock Goes here</div>
                <Link to={`/edit-product/${product.id}`}>
                  <button>Edit</button>
                </Link>
                <button onClick={() => {}}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div key={product.id} className='productContainer'>
          <div>
            <div>
              <div>
                <img
                  src={product.image}
                  style={{ width: '200px', height: '200px' }}
                />
                <div className='nameAndPrice'>
                  <div className='productName'>{product.name}</div>
                  <div className='productPrice'>${product.price}</div>
                </div>
                <div className='productInventory'>isInStock Goes here</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
