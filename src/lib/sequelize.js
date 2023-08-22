const { Sequelize } = require('sequelize');

const { config } = require('../../config');
const setupModels = require('../db/models');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI, {
  dialectModule: require('pg'),
  logging: true,
});

setupModels(sequelize);

module.exports = sequelize;
