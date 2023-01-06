const express = require('express')
const ProductsService = require('./../services/ProductsService');
const validatorHandler = require('./../middlewares/validatorHandler');
const {createProductSchema,updateProductSchema,getProductSchema,queryProductSchema} =  require('./../schemas/productSchema');


const router = express.Router();
const service = ProductsService;

router.get('/',
validatorHandler(queryProductSchema,'query'),
  async (req,res)=>{
    let products = await service.getAllProducts(req.query);
    res.json(products)
  }
)

router.post('/',
  validatorHandler(createProductSchema,'body'),
  async(req,res)=>{
    const body = req.body;
    const newProduct = await service.create(body);

    res.status(201).json({
      message:"creado con exito",
      data:newProduct
    })
  }
)

router.patch('/:id',(req,res)=>{
  const { id } = req.params;
  const body = req.body;
  res.json({
    message:"creado con exito",
    data:body,
    id:id
  })
})

router.put('/:id',
  validatorHandler(getProductSchema,'params'),
  validatorHandler(updateProductSchema,'body'),
  async(req,res,next)=>{
  try{
    const { id } = req.params;
    const body = req.body;
    const product = await service.update(id,body);
    res.json({
      message:"Actualizado con exito",
      data:product
    })
  }catch(error){
    // res.status(404).json({ Sin BOOM
    //   msg: error.message
    // })

    //Con BOOM
    next(error)
  }
})

router.delete('/:id', async (req,res)=>{
  const { id } = req.params;
  const product = await service.delete(id);
  res.json({
    message:"Delete",
    data:product,
  })
})


router.get('/:id',
  validatorHandler(getProductSchema,'params'),
  async (req,res,next)=>{
  //const id = req.params.id;
  console.log('pasoa por aca')
  try{
    const { id } = req.params;
    const product = await service.findOne(id);
    //if ( typeof product === 'undefined' ){
      //msg = 'Producto no encontrado';
      //return res.json({"msg" : 'No se han encontrado productos bajo los parametros de busqueda dados.'})
    //}
    return res.json(product)
  }catch(error){
    next(error);
  }

})


module.exports = router;
