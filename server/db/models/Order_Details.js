const Sequelize = require('sequelize');
const db = require('../db');

const Order_Details = db.define('order_details', {
  quantity: {
    type: Sequelize.BIGINT,
    defaultValue: 1
  },
  price: {
    type: Sequelize.BIGINT,
    defaultValue: 10
  },
});

module.exports = Order_Details;
