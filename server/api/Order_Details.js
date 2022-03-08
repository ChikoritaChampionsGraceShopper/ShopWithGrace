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
  console.log(req.body)
  try {
    let order = await Order.findByPk(req.params.id)
    if (order) await order.removeProducts(await order.getProducts())
    if (!order) order = await Order.create({status: "Fullfilled"})
      for (let productId in req.body) {
        let product = await Product.findByPk(productId)
        order.addProduct(product, {price: product.price, quantity: req.body[productId]})
        let stock = product.inventory - req.body[productId]
        console.log(stock)
        if (stock < 1) window.alert('sorry, no more beans!')
        else {
        product.update({inventory: stock})
        }
      }
        res.json(req.body)
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
