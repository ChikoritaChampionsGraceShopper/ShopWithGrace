const productRouter = require('express').Router()
const { models: { Product }} = require('../db')

productRouter.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      attributes: ['id', 'name', 'image', 'category', 'price', 'inventory', 'origin', 'description']
    })
    // console.log(products)
    res.json(products)
  } catch (error) {
    next(error)
  }
})

productRouter.get(`/:id`, async(req, res, next) => {
  try {
    const product = await Product.findOne({where: {
      id: req.params.id,
    }, attributes: {
      exclude: ['favorite', 'status']
    }})
    res.send(product)
  } catch (error) {
    next(error)
  }
})


module.exports = productRouter
