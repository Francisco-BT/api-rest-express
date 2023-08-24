const boom = require('boom');

const { models } = require('../lib/sequelize');

class OrdersService {
  find() {
    return models.Order.findAll();
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: ['user'],
        },
      ],
    });

    if (!order) {
      throw boom.notFound('order not found');
    }

    return order;
  }

  create(data) {
    return models.Order.create(data);
  }

  async update(id, changes) {
    const order = await this.findOne(id);

    return order.update(changes);
  }

  async delete(id) {
    const order = await this.findOne(id);
    await order.destroy();

    return { id };
  }
}

module.exports = OrdersService;
