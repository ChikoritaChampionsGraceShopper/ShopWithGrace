const Order_DetailsRouter = require('express').Router()
const { models: { Order_Details, Product, Order }} = require('../db')
const User = require('../db/models/User')

Order_DetailsRouter.get('/', async (req, res, next) => {
  try {
    const orderDetails = await Order_Details.findAll({
      attributes: ['orderId', 'productId', 'quantity', 'price']
    })
    res.json(orderDetails)
  } catch (error) {
    next(error)
  }
})

Order_DetailsRouter.get('/:userId', async (req, res, next) => {
  try {
    const userOrder_Details = await Order.findOne({ where: {
      userId: req.params.userId,
      status: 'Unfulfilled'
    }, include: {
      model: Order_Details
    }})
    res.json(userOrder_Details)
  } catch (error) {
    next(error)
  }
})

// Order_DetailsRouter.post('/:userId', async (req, res, next) => {
//   try {
//     console.log(req)
//     const userOrder_Details = await Order.findOne({ where: {
//       userId: req.params.userId,
//       status: 'Unfulfilled'
//     }, include: {
//       model: Order_Details
//     }})
//     res.json(userOrder_Details)
//   } catch (error) {
//     next(error)
//   }
// })

Order_DetailsRouter.put('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId, {
      include: {model: Order, where: {status: 'Unfulfilled'}, include: {model: Order_Details}}
    })
    console.log('User:', user)
    const orderId = user.order.filter(order => order.status === 'Unfulfilled')
    console.log('orderId:', orderId)
  } catch (err) {
    next(err)
  }
})

// Order_DetailsRouter.delete('/', async (req, res, next) => {
//   try {
//     const destroyOrder_Details = await Order_Details.findOne({ where: {

//     }})
//   } catch (error) {
//     next(error)
//   }
// })

module.exports = Order_DetailsRouter
