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
    type: Sequelize.ENUM('green', 'black', 'white', 'oolong'),
    allowNull: false
  },
  price: {
    type: Sequelize.NUMBER,
    validate: {
      min: 0,
      notNull: true
    }
  },
  favorite: {
    type: Sequelize.ENUM('', 1),
    get() {
      if (this.favorite === 1) return true
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
    type: Sequelize.NUMBER,
    validate: {
      min: 0,
      notNull: true
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
