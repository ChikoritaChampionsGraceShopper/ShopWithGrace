const isAdmin = (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      console.log('good to go');
      next();
    } else {
      res.sendStatus(403);
    }
  } catch (error) {
    next(error);
  }
};

const userOrAdmin = (req, res, next) => {
  try {
    if (req.user.isAdmin || req.user.id.toString() === req.params.id) {
      next();
    } else {
      res.sendStatus(403);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  isAdmin,
  userOrAdmin,
};
