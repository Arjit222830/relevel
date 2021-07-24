const errorHandler = (err, req, res, next) => {
  // errorHandler  Middleware
  res.status(500).send('Something failed.');
  next();
};

module.exports = errorHandler;
