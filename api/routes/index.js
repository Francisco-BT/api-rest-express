const { Router } = require('express');

const productsRouter = require('./products.router');
const categoriesRouter = require('./categories.router');
const usersRouter = require('./users.router');
const customersRouter = require('./customer.router');

function routerApi(app) {
  const router = Router();
  app.use('/api/v1', router);
  router.use('/users', usersRouter);
  router.use('/products', productsRouter);
  router.use('/customers', customersRouter);
  router.use('/categories', categoriesRouter);
}

module.exports = routerApi;
