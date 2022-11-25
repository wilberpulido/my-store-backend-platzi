const { User,UserSchema } = require('./userModel');
const { Customer,CustomerSchma } = require('./CustomerModel');
const { Category,CategorySchema } = require('./CategoryModel');
const { Product,ProductSchema } = require('./ProductModel');

function setupModels(sequelize){
  User.init(UserSchema,User.config(sequelize));
  Customer.init(CustomerSchma,Customer.config(sequelize));
  Category.init(CategorySchema,Category.config(sequelize));
  Product.init(ProductSchema,Product.config(sequelize))
  User.associate(sequelize.models);
  Customer.associate(sequelize.models);
  Category.associate(sequelize.models);
  Product.associate(sequelize.models);
}

module.exports = setupModels;
