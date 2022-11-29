const { User,UserSchema } = require('./UserModel');
const { Customer,CustomerSchma } = require('./CustomerModel');
const { Category,CategorySchema } = require('./CategoryModel');
const { Product,ProductSchema } = require('./ProductModel');
const { Order,OrderSchema } = require('./OrderModel');
const { OrderProduct,OrderProductSchma } = require('./OrderProductModel');

function setupModels(sequelize){
  User.init(UserSchema,User.config(sequelize));
  Customer.init(CustomerSchma,Customer.config(sequelize));
  Order.init(OrderSchema,Order.config(sequelize));
  Category.init(CategorySchema,Category.config(sequelize));
  Product.init(ProductSchema,Product.config(sequelize))
  OrderProduct.init(OrderProductSchma,OrderProduct.config(sequelize))

  User.associate(sequelize.models);
  Customer.associate(sequelize.models);
  Order.associate(sequelize.models);
  Category.associate(sequelize.models);
  Product.associate(sequelize.models);
  OrderProductSchma.associate(sequelize.models);
}

module.exports = setupModels;
