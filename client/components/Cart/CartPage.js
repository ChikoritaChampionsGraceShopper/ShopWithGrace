import React, { useState, useContext, useEffect } from 'react';
import { useCart, CartContext } from './CartProvider';
import CartItem from './CartItem';
import Total from './Total';

const CartPage = ({match}) => {
  const { cartItems, itemCount, total, clearCart } = useContext(CartContext)
  const {cart, fetchCart, updateCart} = useCart()
  const id = match.params.id
  useEffect(() => {
    fetchCart(id)
  }, [])
  // useEffect(() => {
  //   updateCart(id)
  // }, [cartItems])

  // console.log('cartItems: ', cartItems)
  // console.log('cart products: ', cart.products)
  // console.log('itemCount: ', itemCount)
  // console.log('total: ', total)

  return (
    // <Layout>
      <>
      <h1> Cart </h1>
      {
        !cart
        ?
        <div className='empty-cart'> Your cart is empty </div>
        :
        <div className='cart-page'>
          <div className='cart-item-container'>
            {
              cart.products.map(item => <CartItem product={item} cart={cart} key={item.id} />)
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
