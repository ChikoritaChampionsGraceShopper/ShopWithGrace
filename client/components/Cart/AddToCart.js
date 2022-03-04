import React, { useState } from 'react';

const addToCart = (item) => {
  let addIt = true;
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === item.id) {
      addIt = false;
    }
    if (addIt) {
      setCart([...cart], item);
    } else {
      // increase quantity
    }
  }
};

const AddToCart = () => {
  const [cart, setCart] = useState([]);
  return <div>{addToCart}</div>;
};

// const AddToCart = () => {

//   const addToCart = (item) => setCart((currentCart) => [...currentCart, item]);

//   const amountOfItems = (id) => cart.filter((item) => item.id === id).length;

//   const listItemsToBuy = () => items.map((item) => (
//     <div key={item.id}>
//       {`${item.name}: $${item.price}`}
//       <button type="submit" onClick={() => addToCart(item)}>Add</button>
//     </div>
//   ))
//   }
