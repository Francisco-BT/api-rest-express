const Joi = require('joi');

const { createUserSchema } = require('./user.schema');

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(50);
const lastName = Joi.string().min(3).max(50);
const phone = Joi.string();
const userId = Joi.number().integer();

const createCustomerSchema = Joi.object({
  name: name.required(),
  user: createUserSchema.required(),
  lastName: lastName.required(),
  phone,
});

const updateCustomerSchema = Joi.object({
  name,
  phone,
  userId,
  lastName,
});

const getCustomerSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createCustomerSchema,
  updateCustomerSchema,
  getCustomerSchema,
};
