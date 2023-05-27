const express = require('express');
const passport = require('passport');
const OrderService = require('../services/OrderService');
const UsersService = require('../services/UsersService');

const router = express.Router();
const orderService = new OrderService();
const UserService = new UsersService();

router.get('/my-orders',
  passport.authenticate('jwt',{session:false}),
  async (req, res, next) => {
  try {
    const user = req.user;
    const orders = await orderService.findByUser(user.sub);
    res.json(orders);
  } catch (error) {
    next(error);
  }
});
router.post('/new-order',
  passport.authenticate('jwt',{session:false}),
  async(req,res)=>{
  const user = req.user;
  const customer = await UserService.findCustomerByUserId(user.sub);
  console.log(customer)
  const data = {
    "customerId": customer.dataValues.id
  }
  console.log(data)

  const newOrder = await orderService.create(data);

  res.status(201).json({
    message:"creado con exito",
    data:newOrder
  })
});


module.exports = router;
