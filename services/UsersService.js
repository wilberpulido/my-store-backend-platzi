const boom = require('@hapi/boom');

//const getConnection = require('../libs/postgres');
//const pool = require('../libs/postgresPool');
const { models } = require('./../libs/sequelize');
const bcrypt = require('bcrypt');

class UserService {
  constructor() {
    // this.pool = pool;
    // this.pool.on('error',(err)=> console.error(err))
  }

  async create(data) {
    const hash = await bcrypt.hash(data.password,10);
    let newUser = '';
    try {
      newUser = await models.User.create({...data,password:hash});
      //delete newUser.password; Una manera, la haremos con serializes
      delete newUser.dataValues.password
    } catch (error) {
      return error;
    }
    return newUser;
  }

  async find() {
    //const client = await getConnection();
    //const tasks = await this.pool.query('SELECT * FROM tasks');
    //const users = await models.User.findAll();
    const users = await models.User.findAll({
        include:[
          'customer'
        ]
      }
    );
    ///return tasks.rows;
    return users;
  }
  async findByEmail(email) {
    // const users = await models.User.findOne({
    //     where: { email }
    //   }
    // );
    // ///return tasks.rows;
    // return users;]

    return await models.User.findOne(
      {
        where: { email }
      }
    );
  }


  async findOne(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound('user not found');
    }
    return user;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const rta = await user.update(changes);
    return rta;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }
  async findCustomerByUserId(id){
    const customer = await models.Customer.findOne({
      where:{
        'user_id': id
      },
    })
    console.log('aca')
    const test = await models.Customer.findOne({
      include: 'user'
    })
    console.log(test)
console.log('fin')
    //console.log(customer);
    return customer;
  }
}

module.exports = UserService;
