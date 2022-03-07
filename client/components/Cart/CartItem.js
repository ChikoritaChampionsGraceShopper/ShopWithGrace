import React, { useContext } from 'react';
import { useCart } from './CartProvider';

const CartItem = (props) => {
    const { updateCart, addToCart } = useCart()
    const { name, image, price, order_details } = props.product;
    const { quantity } = order_details
    console.log('here are the props: ', props)
    console.log('quantity', quantity)
    return (
      <div className='cart-item'>
        <div className='item-image'>
          {/* <img src=[image] alt='product' /> */}
        </div>
        <div className='name-price'>
          <h4> {name} </h4>
          <p> {`Price: ${price}`} </p>
        </div>
        <div className='quantity'>
          <p> {`Quantity: ${quantity}`} </p>
        </div>
        <div className='btns-container'>
          <button
            onClick={() => addToCart(props.product.id)}
            className='btn-increase'
          > Increase
            {/* <PlusCircleIcon width='20px' /> */}
          </button>
          {
            quantity === 1 ?
            <button
              // onClick={() => updateCart(id)}
              className='btn-trash'
            > Remove
              {/* <TrashIcon width='20px' /> */}
            </button>
            :
            <button
            // onClick={() => updateCart(id)}
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
