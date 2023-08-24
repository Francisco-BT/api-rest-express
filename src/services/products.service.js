const boom = require('boom');
const { Op } = require('sequelize');

const { models } = require('../lib/sequelize');

class ProductsService {
  create(data) {
    return models.Product.create(data);
  }

  find(query) {
    const { limit, offset, price, priceMin, priceMax } = query;
    const options = {
      include: ['category'],
      where: {},
    };

    if (limit && query) {
      options.limit = limit;
      options.offset = offset;
    }

    if (price) {
      options.where.price = price;
    }

    if (priceMin && priceMax) {
      options.where.price = {
        [Op.gte]: priceMin,
        [Op.lte]: priceMax,
      };
    }

    return models.Product.findAll(options);
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
