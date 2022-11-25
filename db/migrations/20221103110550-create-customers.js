'use strict';
const {CustomerSchma,CUSTOMER_TABLE} = require('./../models/CustomerModel');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(CUSTOMER_TABLE,CustomerSchma);
  },

  async down (queryInterface, ) {
    await queryInterface.dropTable(CUSTOMER_TABLE)
  }
};
