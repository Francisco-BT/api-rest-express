const boom = require('boom');

const { models } = require('../lib/sequelize');

class ProductsService {
  create(data) {
    return models.Product.create(data);
  }

  find() {
    return models.Product.findAll({
      include: ['category'],
    });
  }

  async findOne(id) {
    const product = await models.Product.findByPk(id);

    if (!product) {
      throw boom.notFound('product not found');
    }

    return product;
  }

  async update(id, data) {
    const product = await this.findOne(id);

    return product.update(data);
  }

  async delete(id) {
    const product = await this.findOne(id);
    await product.destroy();

    return { id };
  }
}

module.exports = ProductsService;
