const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(50);
const description = Joi.string().min(10);
const price = Joi.number().integer().min(10);
const image = Joi.string().uri();
const categoryId = Joi.number().integer();

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  description: description.required(),
  image: image.required(),
  categoryId: categoryId.required(),
});

const updateProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  description,
  categoryId,
  image,
});

const getProductSchema = Joi.object({
  id: id.required(),
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema };
