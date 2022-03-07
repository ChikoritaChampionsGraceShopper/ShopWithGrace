import React, { useContext } from 'react';
import { CartContext } from './CartProvider';


const CartItem = (props) => {
    const { increaseItemQuantity, decreaseItemQuantity, removeFromCart } = useContext(CartContext)
    const { name, image, price, quantity } = props.product;
    // console.log('increase', increase)
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
            onClick={() => increaseItemQuantity(props.product)}
            className='btn-increase'
          > Increase
            {/* <PlusCircleIcon width='20px' /> */}
          </button>
          {
            quantity === 1 ?
            <button
              onClick={() => removeFromCart(props.product)}
              className='btn-trash'
            > Remove
              {/* <TrashIcon width='20px' /> */}
            </button>
            :
            <button
            onClick={() => decreaseItemQuantity(props.product)}
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
