import React from 'react'
import { withRouter } from 'react-router-dom';

const Total = ({ itemCount, total, clearCart, history }) => {
  return (
    <div className='total-container'>
      <div className='total'>
        <p>Total Items: {itemCount}</p>
        <p>{`Total: $${total}`}</p>
        <div className='checkout'>
          <button className='button is-black' onClick={() => history.push('/checkout')}> Checkout </button> 
          <button className='button is-white' onClick={() => clearCart()}> Clear </button>
        </div>
      </div>
    </div>
  )
}

export default withRouter(total);

