const Sequelize = require('sequelize');
const db = require('../db');

const Cart = db.define('cart', {
  name: {
    type: Sequelize.STRING,
  },
  image: {
    type: Sequelize.TEXT,
  },
  quantity: {
    type: Sequelize.INTEGER,
  },
  price_per_item: {
    type: Sequelize.BIGINT,
  },
  subtotal: {
    type: Sequelize.BIGINT,
  },
  total_price: {
    type: Sequelize.BIGINT,
  },
});

module.exports = Cart;
