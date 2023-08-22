const boom = require('boom');
const { models } = require('../lib/sequelize');

class CustomerService {
  async find() {
    return models.Customer.findAll();
  }

  async findOne(id) {
    const customer = await models.Customer.findByPk(id);

    if (!customer) {
      throw boom.notFound('customer not found');
    }

    return customer;
  }

  create(data) {
    return models.Customer.create(data);
  }

  async update(id, changes) {
    const customer = await this.findOne(id);

    return customer.update(changes);
  }

  async delete(id) {
    const customer = await this.findOne(id);

    await customer.destroy();
    return { id };
  }
}

module.exports = CustomerService;
