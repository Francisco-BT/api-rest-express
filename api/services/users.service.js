const boom = require('boom');

const { models } = require('../lib/sequelize');

class UserService {
  async find() {
    return await models.User.findAll();
  }
}

module.exports = UserService;
