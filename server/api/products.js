const productRouter = require('express').Router()
const { Router } = require('react-router-dom')
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
    res.json(product)
  } catch (error) {
    next(error)
  }
})

productRouter.post('/', async (req, res, next) => {
  try {
    const data = req.body
    const { dataVal } = await Product.create(data)
    res.json(dataVal)
  } catch (err) {
    next(err)
  }
})

productRouter.put('/:productId', async (req, res, next) => {
  try {
    const data = req.body
    const { productId } = req.params
    await Product.udpate({ ...data }, {where: {id: productId}})
    res.json(data)
  } catch (err) {
    next(err)
  }
})

productRouter.delete('/:productId', async (req, res, next) => {
  try {
    const { productId } = req.params
    await Product.destroy({where: {id: productId}})
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})


module.exports = productRouter
