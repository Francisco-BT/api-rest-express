const express = require('express');

const ProductsService = require('../../src/services/products.service');
const validationHandler = require('../../src/middleware/validator.handler');
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
} = require('../../src/schemas/product.schema');

const service = new ProductsService();
const router = express.Router();

router.get('/', async (req, res) => {
  const products = await service.find();

  res.json(products);
});

router.get(
  '/:id',
  validationHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);

      res.json(product);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  validationHandler(createProductSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newProduct = await service.create(body);

    res.status(201).json(newProduct);
  },
);

router.patch(
  '/:id',
  validationHandler(getProductSchema, 'params'),
  validationHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    const { id } = req.params;
    const body = req.body;
    try {
      const product = await service.update(id, body);

      res.json(product);
    } catch (error) {
      next(error);
    }
  },
);

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await service.delete(id);

  res.json(product);
});

module.exports = router;
