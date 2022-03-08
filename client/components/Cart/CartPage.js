import React, { useState, useContext, useEffect } from 'react';
import { useCart, CartContext } from './CartProvider';
import CartItem from './CartItem';
import Total from './Total';

const CartPage = ({match}) => {
  const { order, cartItems, itemCount, total, clearCart } = useContext(CartContext)
  const { fetchCart } = useCart()
  const id = match.params.id
  useEffect(() => {
    fetchCart(id)
  }, [])

  return (
    // <Layout>
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
    // </Layout>
  )
}

export default CartPage;
