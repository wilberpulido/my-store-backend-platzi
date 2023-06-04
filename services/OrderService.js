const { models }= require('../libs/sequelize');
const boom = require('@hapi/boom');

class OrderService {
  async create(data){
    const newOrder = await models.Order.create(data);
    return newOrder;
  }
  async find() {
    return await models.Order.findAll();
  }
  async findOne(id) {
    const order = await models.Order.findByPk(id,{
      include:[
        {
          association: "customer",
          include: ['user']
        },
        'items'
      ]
    });
    if (!order) {
      throw boom.notFound('customer not found');
    }
    return order;
  }
  async findByUser(userId){
    const orders = await models.Order.findAll({
      where: {
        "$customer.user.id$":userId
      },
      include:[
        {
          association: 'customer',
          include: ['user']
        }
      ]
    }
    );
    return orders;
  }
  async addItem(data){
    return await models.OrderProduct.create(data);
  }

}

module.exports = OrderService;
