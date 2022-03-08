const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  image: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true
    }
  },
  category: {
    type: Sequelize.ENUM('Green', 'Black', 'White', 'Oolong'),
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
    }
  },
  inventory: {
    type: Sequelize.BIGINT,
    allowNull: false,
    validate: {
      min: 0,
    }
  },
  origin: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
})

module.exports = Product
