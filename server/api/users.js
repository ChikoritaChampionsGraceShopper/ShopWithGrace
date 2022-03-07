const userRouter = require('express').Router();
const { requireToken, isAdmin } = require('./gateKeepingMiddleware');
const {
  models: { User, Product, Order, Order_Details },
} = require('../db');
module.exports = userRouter;

userRouter.get('/', requireToken, isAdmin, async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).send('You have hit a security barrier!');
    }
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      // attributes: ['id', 'username'],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

userRouter.get('/:id', requireToken, isAdmin, async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).send('You have hit a security barrier!');
    }
    const user = await User.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

userRouter.post('/', requireToken, isAdmin, async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).send('You have hit a security barrier!');
    }
    const user = await User.Create(req.body);
    const newOrder = await Order.create({
      //add something to here to see if order is fullfilled or unfullfilled
      userId: user.id,
    });
    user.hasOrder(newOrder);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

userRouter.put('/:UserId', requireToken, isAdmin, async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).send('You have hit a security barrier!');
    }
    const {
      id,
      username,
      password,
      full_name,
      email,
      street_address,
      city,
      state,
      zip_code,
      isAdmin,
    } = req.body;
    const { userId } = req.params;
    // const salt = User.generateSalt()
    const hashPassword = User.encryptPassword(password, salt);

    await User.update(
      {
        username,
        password,
        full_name,
        email,
        street_address,
        city,
        state,
        zip_code,
        isAdmin,
      },
      { where: { id: userId } }
    );
    //res.status(204).end()
  } catch (error) {
    next(error);
  }
});

userRouter.delete('/:userId', requireToken, isAdmin, async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).send('You have hit a security barrier!');
    }
    const user = await User.findByPk(req.params.userId);
    await user.destroy();
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});
