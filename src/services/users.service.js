const boom = require('boom');

const { models } = require('../lib/sequelize');

class UserService {
  async find() {
    return await models.User.findAll({ include: ['customer'] });
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);

    if (!user) {
      throw boom.notFound('user not found');
    }

    return user;
  }

  async create(data) {
    return await models.User.create(data);
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    return await user.update(changes);
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();

    return { id };
  }
}

module.exports = UserService;
