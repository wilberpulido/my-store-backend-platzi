const { models }= require('../libs/sequelize');
const boom = require('@hapi/boom');

class OrderService {
  async create(data){
    console.log("data")
    console.log(data)
    return await models.Order.create(data);
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
  async addItem(data){
    return await models.OrderProduct.create(data);
  }
  async findByUser(userId){
    const orders = await models.Order.findAll({
      where:{
        '$customer.user.id$': userId
      },
      include: {
        association: 'customer',
        include: ['user']
      },
    });
    return orders;
  }

}

module.exports = OrderService;
