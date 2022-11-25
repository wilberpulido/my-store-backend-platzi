// const faker = require('faker');
const boom = require('@hapi/boom');
//const pool = require('../libs/postgresPool');
//const sequelize = require('../libs/sequelize');
const { models }= require('../libs/sequelize');

class ProductsService {
  constructor(){
    //this.products = [];
    // this.generate();
    // this.pool = pool;
    // this.pool.on('error',(err)=> console.error(err))
  }
  // generate(){
  //   const limit = 100;

  //   for (let i = 0; i < limit; i++) {
  //     this.products.push({
  //       id: faker.datatype.uuid(),
  //       name: faker.commerce.productName(),
  //       price: parseInt(faker.commerce.price(),10),
  //       image: faker.image.imageUrl(),
  //       isBlock: faker.datatype.boolean(),
  //     })
  //   }
  // }

  async create (data){
    // const newProduct = {
    //   id: faker.datatype.uuid(),
    //   ...data,
    // }
    // this.products.push(newProduct);
    const newProduct = await models.Product.create(data)
    return newProduct;
  }
  async getAllProducts(){
    //const query = 'SELECT * FROM tasks';

    //const allProducts = await this.pool.query(query)
    //const [data,metadata] = await sequelize.query(query)
    //const [data] = await sequelize.query(query)
    const products = await models.Product.findAll({
      include:["category"]
    });
    return products;
  }
  find(){

  }
  async findOne(id){
    //const error = this.error();
    const product = this.products.find(item => item.id === id);
    if(!product){
      throw boom.notFound('product not found msj test haber')
    }
    if (product.isBlock){
      throw boom.conflict('product is block')
    }

    return product
  }
  async update(id,changes){
    const indexProduct = this.products.findIndex(item => item.id === id)
    if (indexProduct === -1){
      //throw new Error('product not found')
      throw boom.notFound('product not found msj test')
    }
    const product = this.products[indexProduct];
    this.products[indexProduct] = {
      ...product,
      ...changes
    };

    return this.products[indexProduct]
  }
  async delete(id){
    const indexProduct = this.products.findIndex(item => item.id === id)
    if (indexProduct === -1){
      throw new Error('product not found')
    }
    return this.products.splice(indexProduct,1);
  }


}

module.exports = new ProductsService;
