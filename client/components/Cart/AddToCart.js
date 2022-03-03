import React, { useState } from 'react'
import Cart from '../../../server/db/models/Cart';

const addToCart = (item) => {
    let addIt = true;
    for (let i = 0; i < cart.length; i++){
        if (cart[i].id === item.id) {
            addIt = false
        } if (addIt) {
            setCart([...cart], item)
        } else {
            // increase quantity
        } 
    }
}

const AddToCart = () => {
    const [cart, setCart] = useState([]);
    return (
        <div>
            {addToCart}
        </div>
    )
}