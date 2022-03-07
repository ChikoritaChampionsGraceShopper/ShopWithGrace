const Sequelize = require('sequelize');
const db = require('../db');

const Cart = db.define('cart', {
  quantity: {
    type: Sequelize.BIGINT,
  },
  price: {
    type: Sequelize.BIGINT,
  },
});

module.exports = Cart;
