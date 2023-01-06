const express = require('express');
const validatorHandler = require('../middlewares/validatorHandler');
const {createOrderSchema,getOrderSchema,addItemSchema} = require('../schemas/OrderSchema')
const OrderService = require('../services/OrderService');

const router = express.Router();
const service = new OrderService();

router.get('/',async (req,res)=>{
  const allOrder = await service.find();
  res.json(allOrder);
});

router.post('/',
  validatorHandler(createOrderSchema,'body'),
  async(req,res)=>{
  const body = req.body;
  const newOrder = await service.create(body);

  res.status(201).json({
    message:"creado con exito",
    data:newOrder
  })
});

router.get('/:id',
  validatorHandler(getOrderSchema,'params'),
  async (req,res,next)=>{
  try{
    const { id } = req.params;
    const product = await service.findOne(id);
    return res.json(product)
  }catch(error){
    next(error);
  }
});

router.post('/add-item',
  validatorHandler(addItemSchema,'body'),
  async(req,res)=>{
  const body = req.body;
  const newItem = await service.addItem(body);

  res.status(201).json({
    message:"creado con exito",
    data:newItem
  })
})

module.exports = router;
