const userRouter = require('express').Router();
const { requireToken, isAdmin } = require('./gateKeepingMiddleware')
const { models: { User }, } = require('../db');
module.exports = userRouter;

userRouter.get('/', requireToken, isAdmin, async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).send('You have hit a security barrier!')
    }
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'username'],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

userRouter.get('/:id', requireToken, isAdmin, async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).send('You have hit a security barrier!')
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

