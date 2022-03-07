const { models: { User }, } = require('../db');

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

const isAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).send('You have hit a security barrier!')
  } else {
    next()
  }
};

const userOrAdmin = (req, res, next) => {
    if (!req.user.isAdmin || req.user.id.toString() === req.params.id) {
      return res.status(403).send('You have hit a security barrier!')
    } else {
      next()
    }
};

module.exports = {
  requireToken,
  isAdmin,
  userOrAdmin
};
