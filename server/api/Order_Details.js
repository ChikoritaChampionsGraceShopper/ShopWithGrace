const Order_DetailsRouter = require('express').Router()
const { models: { Order_Details, Product, Order }} = require('../db')
const User = require('../db/models/User')

Order_DetailsRouter.get('/', async (req, res, next) => {
  try {
    const allOrders = await Order_Details.findAll()
    res.json(allOrders)
  } catch (error) {
    next(error)
  }
})

Order_DetailsRouter.get('/:id', async (req, res, next) => {
  try {
    const userCart = await Order.findOne({ where: {
      id: req.params.id,
      status: 'Unfulfilled'
      },
      include: { model: Product }
    })
    res.json(userCart)
  } catch (error) {
    next(error)
  }
})

Order_DetailsRouter.put('/:id', async (req, res, next) => {
  try {
    const orderToUpdate = await Order.findByPk(req.params.id, {include: {model: Product}})
    // const user = await User.findByPk(req.params.userId, {
    //   include: {model: Order, include: {model: Product}}
    // })

    // const orderId = user.order.filter(order => order.status === 'Unfulfilled')
    const {productId, quantity} = req.body
    if (quantity === 0) orderToUpdate.removeProduct(productId)
    await orderToUpdate.addProduct({productId, quantity})
    // const [productOrderToBeUpdated, wasCreated] = await Order_Details.findOrCreate({where: {
    //   productId,
    //   orderId
    // }})
    // if (quantity === 0) await productOrderToBeUpdated.destroy()
    // if (wasCreated) return res.sendStatus(201)
    // productOrderToBeUpdated.quantity = quantity
    await orderToUpdate.save()
    res.sendStatus(201)
  } catch (err) {
    next(err)
  }
})

Order_DetailsRouter.post('/:id', async (req, res, next) => {
  try {
    console.log(req)
    const userOrder_Details = await Order.findOne({ where: {
      id: req.params.id,
      status: 'Unfulfilled'
    }, include: {
      model: Product
    }})
    res.json(userOrder_Details)
  } catch (error) {
    next(error)
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
