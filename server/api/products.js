const productRouter = require('express').Router();
const { requireToken, isAdmin } = require('./gateKeepingMiddleware');
const {
  models: { Product },
} = require('../db');

productRouter.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      attributes: [
        'id',
        'name',
        'image',
        'category',
        'price',
        'inventory',
        'origin',
        'description',
      ],
    });
    res.json(products);
  } catch (error) {
    next(error);
  }
});

productRouter.get(`/:id`, async(req, res, next) => {
  try {
    const product = await Product.findOne({
      where: {
        id: req.params.id,
      }
    });
    console.log(product)
    res.json(product);
  } catch (error) {
    next(error);
  }
});

productRouter.get('/all/:category', async (req, res, next) => {
  try {
    const categories = await Product.findAll({
      where: {
        category: req.params.category,
      },
    });
    res.send(categories);
  } catch (error) {
    next(error);
  }
});


productRouter.post('/', requireToken, isAdmin, async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).send('You have hit a security barrier!');
    }
    const data = req.body;
    const { dataVal } = await Product.create(data);
    res.json(dataVal);
  } catch (err) {
    next(err);
  }
});

productRouter.put(
  '/:productId',
  // requireToken,
  // isAdmin,
  async (req, res, next) => {
    try {
      // if (!req.user.isAdmin) {
      //   return res.status(403).send('You have hit a security barrier!');
      // }
      const data = req.body;
      const { productId } = req.params;
      await Product.update({ ...data }, { where: { id: productId } });
      res.json(data);
    } catch (err) {
      next(err);
    }
  }
);

productRouter.delete(
  '/:productId',
  // requireToken,
  // isAdmin,
  async (req, res, next) => {
    try {
      // if (!req.user.isAdmin) {
      //   return res.status(403).send('You have hit a security barrier!');
      // }
      const { productId } = req.params;
      await Product.destroy({ where: { id: productId } });
      res.status(204).end();
    } catch (err) {
      next(err);
    }
  }
);

module.exports = productRouter;
