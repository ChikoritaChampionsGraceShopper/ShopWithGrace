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

Order_DetailsRouter.get('/:userId', async (req, res, next) => {
  try {
    const userCart = await Order.findOne({ where: {
      userId: req.params.userId,
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
    let newAmount = parseInt(productOrderToBeUpdated.quantity) + quantity
    productOrderToBeUpdated.quantity = newAmount
    productOrderToBeUpdated.price = 10 * newAmount

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

Order_DetailsRouter.delete('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId, {
      include: {model: Order, include: {model: Product}}
    })
    const cartContents = user.orders.filter(order => !order.status)[0].products
    await Promise.all(
      cartContents.map(async item => {
        const orderRemoved = item.OrderItems
        await orderRemoved.destroy()
      })
    )
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

module.exports = Order_DetailsRouter
