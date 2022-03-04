const cartRouter = require('express').Router()
const { models: { Cart }} = require('../db')

cartRouter.get('/', async (req, res, next) => {
  try {
    const cart = await Cart.findAll({
      attributes: ['orderId', 'productId', 'quantity', 'price']
    })
    res.json(cart)
  } catch (error) {
    next(error)
  }
})

module.exports = cartRouter
