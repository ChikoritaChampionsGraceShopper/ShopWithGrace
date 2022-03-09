import React, { useContext } from 'react'
import { CartContext } from './CartProvider'
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux';

const CartIcon = (props) => {
  const { itemCount } = useContext(CartContext)
  const isLoggedIn = useSelector((state) => !!state.auth.id);
  const id = props.id
  return (
    <div>
    {isLoggedIn ? (
      <Link to={`/cart/${id}`} >
    <div className='cart-container' >
      <img src='https://imgs.search.brave.com/IiYikCMYq8aJc8p1UbfcRchnfnyMkuaLzu1rrDijSBA/rs:fit:474:225:1/g:ce/aHR0cHM6Ly90c2Ux/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC51/YUVGOTRDdldRUGZ4/N1NkQUtNQ0hnSGFI/YSZwaWQ9QXBp' />
      {
        itemCount > 0 ? <span className='cart-count' id='lblCartCount'> { itemCount } </span> : null
      }
    </div>
    </Link>
    ) : (
      <Link to='/cart' >
    <div className='cart-container' >
      <img src='https://imgs.search.brave.com/IiYikCMYq8aJc8p1UbfcRchnfnyMkuaLzu1rrDijSBA/rs:fit:474:225:1/g:ce/aHR0cHM6Ly90c2Ux/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC51/YUVGOTRDdldRUGZ4/N1NkQUtNQ0hnSGFI/YSZwaWQ9QXBp' />
      {
        itemCount > 0 ? <span className='cart-count' id='lblCartCount'> { itemCount } </span> : null
      }
    </div>
    </Link>
    )}
    </div>

  )
}

export default CartIcon
