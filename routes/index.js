const productsRouter = require('./productsRouter')
const usersRouter = require('./usersRouter')
const customersRouter = require('./customersRouter');
const categoriesRouter = require('./categoriesRouter');
const express = require('express')

function routerApi(app) {
  const router = express.Router()
  app.use('/api/v1',router);
  router.use('/products',productsRouter)
  router.use('/users',usersRouter)
  router.use('/customers',customersRouter)
  router.use('/categories',categoriesRouter)
}

module.exports = routerApi;
