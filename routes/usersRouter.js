const express = require('express')
const router = express.Router();
const UsersService = require('./../services/UsersService');
const validatorHandler = require('./../middlewares/validatorHandler');
const { updateUserSchema, createUserSchema, getUserSchema } = require('./../schemas/userSchema');

const service = new UsersService;

// router.get('/',(req,res)=>{
//   const { limit,offset } = req.query
//   if (limit && offset){
//     return res.json({
//       limit,offset
//     })
//   }
//   return res.send('Sin limit y sin offset')
// })

router.get('/:id',
  validatorHandler(getUserSchema,'params')
  ,async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await service.findOne(id);
    return res.json(user);
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const users = await service.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.post('/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newUser = await service.create(body);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }
);

router.put('/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const category = await service.update(id, body);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({id});
    } catch (error) {
      next(error);
    }
  }
);


module.exports = router;
