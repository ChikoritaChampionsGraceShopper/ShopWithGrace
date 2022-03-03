const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  status: {
    type: Sequelize.STRING,
    defaultValue: 'Unfulfilled',
    validate: {
      isIn: [['gas', 'diesel', 'electric']]
    }
  }
});

module.exports = Order;
