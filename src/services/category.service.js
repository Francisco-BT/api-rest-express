const boom = require('boom');

const { models } = require('../lib/sequelize');

class CategoryService {
  create(data) {
    return models.Category.create(data);
  }

  find() {
    return models.Category.findAll();
  }

  async findOne(id) {
    const category = await models.Category.findByPk(id, {
      include: ['products'],
    });

    if (!category) {
      throw boom.notFound('category not found');
    }

    return category;
  }

  async update(id, changes) {
    const category = await this.findOne(id);

    return category.update(changes);
  }

  async delete(id) {
    const category = await this.findOne(id);
    await category.destroy();

    return { id };
  }
}

module.exports = CategoryService;
