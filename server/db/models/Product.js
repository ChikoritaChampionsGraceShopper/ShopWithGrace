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
    type: Sequelize.BIGINT,
    allowNull: false,
    validate: {
      min: 0,
    }
  },
  favorite: {
    type: Sequelize.ENUM('0', '1'),
    get() {
      if (this.favorite === '1') return true
      else {
        return false
      }
    }
  },
  status: {
    type: Sequelize.ENUM('in stock', 'low stock', 'out of stock'),
    get() {
      if (this.inventory === 0) this.status = 'out of stock'
      if (this.inventory <= 10) this.status = 'low stock'
      if (this.inventory > 10) this.status = 'in stock'
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
    type: Sequelize.ENUM('China', 'Taiwan', 'India', 'Japan'),
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
})

module.exports = Product
