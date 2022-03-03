import React, { useState } from 'react'

const items = [{
  id: 1,
  name: 'Fuding Shou Mei Dragon Ball White Tea',
  image: 'https://www.teasandthes.com/upload/public/images/product/1b1618cf4d86290bae8ae68b5d806ec6.jpg',
  category: 'White',
  price: 10,
  favorite: "0",
  status: 'in stock',
  inventory: 25,
  origin: 'China',
  description: "TeaVivre's dragon ball white tea is made of Fuding tea species, the liquid changes from light to deep, and the taste is sweet, with lingering fragrance in the cup."
}, {
  id: 2,
  name: 'Taiwan High Mountain Oolong Tea',
  image: 'https://www.teasandthes.com/images/product//t/a/taiwan_high_mountain_oolong_3.jpg',
  category: 'Oolong',
  price: 10,
  favorite: "0",
  status: 'in stock',
  inventory: 25,
  origin: 'Taiwan',
  description: 'An oolong tea comes from Taiwan, carries a quiet and beautiful fragrance of flower. Taste the typical flavor of high mountain tea.'
}, {
  id: 3,
  name: 'Nonpareil Handmade Anxi Yun Xiang TieGuanYin Oolong Tea',
  image: 'https://www.teasandthes.com/images/product//y/u/yunxiang_anxi_tieguanyin_w1.jpg',
  category: 'Oolong',
  price: 10,
  favorite: "0",
  status: 'in stock',
  inventory: 25,
  origin: 'China',
  description: "TeaVivre special selected hand-made Yun Xiang Tie Guan Yin is a roasted oolong tea. Its making method is unique and traditional, which improves the tea’s aroma and mellows its taste. But the skill has high demands for makers."
}]

const cartItems = cart.map((item) => (
  <div key={item.id}>
    {`${item.name}: $${item.price}`}
    <input type="submit" value="remove" onClick={() => removeFromCart(item)} />
  </div>
));

const removeFromCart = (item) => {
  let hardCopy = [...cart]
  hardCopy = hardCopy.filter((cartItem) => cartItem.id != item.id)
  setCart(hardCopy)
}

const CartItems = (items) => {
  const [cart, setCart] = useState([]);
    return (

      <div>
        {cartItems}
      </div>
    )
}
