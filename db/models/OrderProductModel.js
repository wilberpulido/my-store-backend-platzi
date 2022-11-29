const { Model,DataTypes,Sequelize } = require('sequelize');
const { ORDER_TABLE } = require('./OrderModel');
const { PRODUCT_TABLE } = require('./ProductModel');

const ORDER_PRODUCT_TABLE = 'customers';

const OrderProductSchma = {
  id: {
    allowNull:false,
    autoIncrement:true,
    primaryKey:true,
    type:DataTypes.INTEGER,
  },
  orderId:{
    field: 'order_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true,
    references:{
      model:ORDER_TABLE,
      key: 'id',
    },
    onUpdate:'CASCADE',
    onDelete:'SET NULL',
  },
  productId:{
    field: 'user_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true,
    references:{
      model:PRODUCT_TABLE,
      key: 'id',
    },
    onUpdate:'CASCADE',
    onDelete:'SET NULL',
  },
  amount: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  createdAt: {
    allowNull:false,
    type:DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  updatedAt: {
    allowNull:false,
    type:DataTypes.DATE,
    field: 'updated_at',
    defaultValue: Sequelize.NOW,
  }
}

class OrderProduct extends Model {
  static associate(models){
  }
  static config(sequelize){
    return {
      sequelize,
      tableName: ORDER_PRODUCT_TABLE,
      modelName: 'OrderProduct',
      timestamps: false,
    }
  }
}

module.exports = { OrderProduct,OrderProductSchma,ORDER_PRODUCT_TABLE };
