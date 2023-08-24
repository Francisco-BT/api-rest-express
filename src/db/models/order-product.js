const { Model, DataTypes } = require('sequelize');

const { ORDER_TABLE } = require('../models/order.model');
const { PRODUCT_TABLE } = require('../models/product.model');

const ORDER_PRODUCT_TABLE = 'orders_products';

const OrderProductSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  amount: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  orderId: {
    field: 'fk_order_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: ORDER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  productId: {
    field: 'fk_product_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PRODUCT_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  createdAt: {
    field: 'created_at',
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
};

class OrderProduct extends Model {
  static associate() {}

  static config(sequelize) {
    return {
      sequelize,
      modelName: 'OrderProduct',
      tableName: ORDER_PRODUCT_TABLE,
      timestamps: false,
    };
  }
}

module.exports = { ORDER_PRODUCT_TABLE, OrderProductSchema, OrderProduct };
