'use strict';
const { DataTypes } = require('sequelize');

const { CUSTOMER_TABLE, CustomerSchema } = require('../models/customer.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.changeColumn(
      CUSTOMER_TABLE,
      CustomerSchema.userId.field,
      {
        field: 'fk_user_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        unique: true,
      },
    );
  },

  async down(queryInterface) {
    await queryInterface.changeColumn(
      CUSTOMER_TABLE,
      CustomerSchema.userId.field,
      {
        field: 'fk_user_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        unique: false,
      },
    );
  },
};
