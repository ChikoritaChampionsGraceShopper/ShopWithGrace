import React, { useContext } from 'react'
import { useCart, CartContext } from './CartProvider'

const CartIcon = ({history}) => {
  const { itemCount } = useContext(CartContext)

  return (
    <div className='cart-container' onClick={() => history.push('/cart')}>
      <img src='https://imgs.search.brave.com/IiYikCMYq8aJc8p1UbfcRchnfnyMkuaLzu1rrDijSBA/rs:fit:474:225:1/g:ce/aHR0cHM6Ly90c2Ux/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC51/YUVGOTRDdldRUGZ4/N1NkQUtNQ0hnSGFI/YSZwaWQ9QXBp' />
      {
        itemCount > 0 ? <span className='cart-count' id='lblCartCount'> { itemCount } </span> : null
      }
    </div>
  )
}

export default CartIcon


// https://imgs.search.brave.com/6idUu8rYrse6ydHM7PE0S6b-KzRx8Kp6Di3j3lR8L8Y/rs:fit:1200:980:1/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvcHJl/dmlld3MvMDAxLzIz/Ni8zNzgvbm9uXzJ4/L2dyZWVuLXRlYS1s/b2dvLWljb24tc2V0/LXZlY3Rvci5qcGc
