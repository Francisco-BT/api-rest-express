const express = require('express');

const CategoryService = require('../../src/services/category.service');
const validatorHandler = require('../../src/middleware/validator.handler');
const {
  getCategorySchema,
  createCategorySchema,
  updateCategorySchema,
} = require('../../src/schemas/category.schema');

const router = express.Router();
const service = new CategoryService();

router.get('/', async (req, res, next) => {
  try {
    res.json(await service.find());
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      return res.json(await service.findOne(id));
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  validatorHandler(createCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const { body } = req;
      res.status(201).json(await service.create(body));
    } catch (error) {
      next(error);
    }
  },
);

router.patch(
  '/:id',
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const { params, body } = req;
      const { id } = params;
      res.json(await service.update(id, body));
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:id',
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;

      res.json(await service.delete(id));
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
