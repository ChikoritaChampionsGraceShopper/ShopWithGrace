const Order_DetailsRouter = require('express').Router()
const { models: { User, Order_Details, Product, Order }} = require('../db')

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
    // console.log(req.headers)
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
    const {productId, quantity} = req.body
    // update the ProductOrder instance
    const [
      productOrderToBeUpdated,
      wasCreated
    ] = await Order_Details.findOrCreate({
      where: {
        productId,
        orderId: req.params.id
      }
    })
    if (quantity === 0) await productOrderToBeUpdated.destroy()
    if (wasCreated) return res.sendStatus(201)
    else {
    productOrderToBeUpdated.quantity = parseInt(productOrderToBeUpdated.quantity) + quantity
    await productOrderToBeUpdated.save()
    res.sendStatus(201)
  }
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
