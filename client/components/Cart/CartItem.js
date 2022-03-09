import React, { useContext, useEffect } from 'react';
import { useCart } from './CartProvider';

const CartItem = (props) => {
    const { updateCart } = useCart()
    const { name, image, price, order_details } = props.product;
    const { id } = props.order
    const { quantity } = order_details

  async function handleChange(quantity) {
      updateCart(id, props.product.id, quantity)
    }

    return (
      <div className='cart-item'>
        <div className='item-image'>
          <img src={image} style={{ width: "200px", height: "200px" }} alt='product' />
        </div>
        <div className='name-price'>
          <h4> {name} </h4>
          <p> {`Price: $${price}`} </p>
        </div>
        <div className='quantity'>
          <p> {`Quantity: ${quantity}`} </p>
        </div>
        <div className='btns-container'>
          <button
            onClick={() => handleChange(1)}
            className='btn-increase'
          > Increase
            {/* <PlusCircleIcon width='20px' /> */}
          </button>
          {
            quantity < 2 ?
            <button
              onClick={() => handleChange(0)}
              className='btn-trash'
            > Remove
              {/* <TrashIcon width='20px' /> */}
            </button>
            :
            <button
            onClick={() => handleChange(-1)}
            className='btn-decrease'
            >Decrease
              {/* <MinusCircleIcon width='20px' /> */}
            </button>
          }
        </div>
      </div>
    );
}

export default CartItem
