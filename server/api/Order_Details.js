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
    const userCart = await Order.findOne({ where: {
      userId: req.params.userId,
      status: 'Unfulfilled'
      },
      // include: { model: Product }
    })
    res.json(userCart)
  } catch (error) {
    next(error)
  }
})

Order_DetailsRouter.post('/:userId', async (req, res, next) => {
  try {
    console.log(req)
    const userOrder_Details = await Order.findOne({ where: {
      userId: req.params.userId,
      status: 'Unfulfilled'
    }, include: {
      model: Product
    }})
    res.json(userOrder_Details)
  } catch (error) {
    next(error)
  }
})

Order_DetailsRouter.put('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId, {
      include: {model: Order, include: {model: Product}}
    })
    const orderId = user.order.filter(order => order.status === 'Unfulfilled')
    const {productId, quantity} = req.body
    const [productOrderToBeUpdated, wasCreated] = await Order_Details.findOrCreate({where: {
      productId,
      orderId
    }})
    if (quantity === 0) await productOrderToBeUpdated.destroy()
    if (wasCreated) return res.sendStatus(201)
    productOrderToBeUpdated.quantity = quantity
    await productOrderToBeUpdated.save()
    res.sendStatus(201)
  } catch (err) {
    next(err)
  }
})

Order_DetailsRouter.delete('/', async (req, res, next) => {
  try {
    const destroyOrder_Details = await Order_Details.findOne({ where: {
    }})
  } catch (error) {
    next(error)
  }
})

module.exports = Order_DetailsRouter
