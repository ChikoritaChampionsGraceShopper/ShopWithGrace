import React from 'react'
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useCart } from './CartProvider';

const Total = ({ itemCount, total, history }) => {
  const {emptyCart} = useCart()
  const id = useSelector(state => state.auth.id)
  function handleClear() {
    emptyCart(id)
  }

  return (
    <div className='total-container'>
      <div className='total'>
        <p>Total Items: {itemCount}</p>
        <p>{`Total: $${total}`}</p>
        <div className='checkout'>
          <button className='button is-black' onClick={() => history.push('/checkout')}> Checkout </button>
          <button className='button is-white' onClick={() => handleClear()}> Clear </button>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Total);

