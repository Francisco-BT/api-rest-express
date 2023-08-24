const { Router } = require('express');

const usersRouter = require('./users.router');
const ordersRouter = require('./orders.router');
const productsRouter = require('./products.router');
const customersRouter = require('./customer.router');
const categoriesRouter = require('./categories.router');

function routerApi(app) {
  const router = Router();
  app.use('/api/v1', router);
  router.use('/users', usersRouter);
  router.use('/orders', ordersRouter);
  router.use('/products', productsRouter);
  router.use('/customers', customersRouter);
  router.use('/categories', categoriesRouter);
}

module.exports = routerApi;
