const apiRouter = require('express').Router();

apiRouter.get("/", (req, res, next) => {
  res.send({
    message: "API is under construction!"
  });
});

apiRouter.use('/users', require('./users'))
apiRouter.use('/products', require('./products'));

// 404 handler
apiRouter.get('*', (req, res, next) => {
    res.status(404).send('Page was not found');
})

module.exports = apiRouter;
