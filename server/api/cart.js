const cartRouter = require('express').Router()
const { models: { Cart, Product, Order }} = require('../db')

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

cartRouter.get('/:userId', async (req, res, next) => {
  try {
    const userCart = await Order.findOne({ where: {
      userId: req.params.userId,
      status: 'Unfulfilled'
    }, include: {
      model: Cart
    }})
    res.json(userCart)
  } catch (error) {
    next(error)
  }
})

cartRouter.post('/:userId', async (req, res, next) => {
  try {
    console.log(req)
    const userCart = await Order.findOne({ where: {
      userId: req.params.userId,
      status: 'Unfulfilled'
    }, include: {
      model: Cart
    }})
    res.json(userCart)
  } catch (error) {
    next(error)
  }
})

// cartRouter.delete('/', async (req, res, next) => {
//   try {
//     const destroyCart = await Cart.findOne({ where: {

//     }})
//   } catch (error) {
//     next(error)
//   }
// })

module.exports = cartRouter
