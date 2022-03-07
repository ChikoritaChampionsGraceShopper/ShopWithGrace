const userRouter = require('express').Router();
const {
  models: { User },
} = require('../db');
module.exports = userRouter;

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log(token);
    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

userRouter.get('/', requireToken, async (req, res, next) => {
  try {
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

userRouter.get('/:id', requireToken, async (req, res, next) => {
  try {
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
