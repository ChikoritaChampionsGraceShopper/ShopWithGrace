const productRouter = require('express').Router()
const { models: { Product }} = require('../db')

productRouter.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.send(products)
  } catch (error) {
    next(error)
  }
})

module.exports = productRouter
