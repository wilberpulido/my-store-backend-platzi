'use strict';

const {OrderProductSchma,ORDER_PRODUCT_TABLE} = require('../models/OrderProductModel')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(ORDER_PRODUCT_TABLE,OrderProductSchma);
  },

  async down (queryInterface) {
    await queryInterface.dropTable(ORDER_PRODUCT_TABLE);
  }
};
