import React, { useState, useContext, useEffect } from 'react';
import { useCart, CartContext } from './CartProvider';
import CartItem from './CartItem';
import Total from './Total';

const CartPage = ({match}) => {
  const { order, clearCart } = useContext(CartContext)
  const { fetchCart, sumItems } = useCart()
  const id = match.params.id
  useEffect(() => {
    fetchCart(id)
  }, [])
  let tempTotal = 0
  let total = tempTotal
  let tempCount = 0
  let itemCount = tempCount

  if (order) {
    const { totalItems, newValue } = sumItems(order.products)
    total = newValue
    itemCount = totalItems
  }

  return (
      <>
      <h1> Cart </h1>
      {
        !order
        ?
        <div className='empty-cart'> Your cart is empty </div>
        :
        <div className='cart-page'>
          <div className='cart-item-container'>
            {
              order.products.map(item => <CartItem product={item} order={order} key={item.id} />)
            }
          </div>
          <Total itemCount={itemCount} total={total} clearCart={clearCart} />
        </div>
      }
      </>
  )
}

export default CartPage;
