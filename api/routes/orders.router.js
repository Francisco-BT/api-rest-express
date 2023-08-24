const { Router } = require('express');

const OrderService = require('../../src/services/orders.service');
const validatorHandler = require('../../src/middleware/validator.handler');
const {
  createOrderSchema,
  getOrderSchema,
  addItemSchema,
} = require('../../src/schemas/orders.schema');

const router = Router();
const service = new OrderService();

router.get('/', async (req, res, next) => {
  try {
    res.json(await service.find());
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;

      res.json(await service.findOne(id));
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  validatorHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const { body } = req;
      res.status(201).json(await service.create(body));
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/item',
  validatorHandler(addItemSchema, 'body'),
  async (req, res, next) => {
    try {
      const { body } = req;

      res.status(201).json(await service.addItem(body));
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
