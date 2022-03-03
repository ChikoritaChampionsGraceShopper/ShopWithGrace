const cartRouter = require('express').Router()
const { models: { Cart }} = require('../db')

cartRouter.get('/', async (req, res, next) => {
  try {
    const cart = await Cart.findAll({
      attributes: ['id', 'name', 'image', 'quantity', 'price_per_item', 'subtotal', 'total_price']
    })
    res.json(cart)
  } catch (error) {
    next(error)
  }
})

module.exports = cartRouter