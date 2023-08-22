const { Router } = require('express');

const CustomerService = require('../../src/services/customer.service');
const validatorHandler = require('../../src/middleware/validator.handler');
const {
  getCustomerSchema,
  createCustomerSchema,
  updateCustomerSchema,
} = require('../../src/schemas/customer.schema');

const service = new CustomerService();
const router = Router();

router.get('/', async (req, res, next) => {
  try {
    res.json(await service.find());
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getCustomerSchema, 'params'),
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
  validatorHandler(createCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const { body } = req;
      const newCustomer = await service.create(body);

      res.status(201).json(newCustomer);
    } catch (error) {
      next(error);
    }
  },
);

router.patch(
  '/:id',
  validatorHandler(getCustomerSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const { body, params } = req;
      const { id } = params;

      res.json(await service.update(id, body));
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:id',
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const response = await service.delete(id);

      res.json(response);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
