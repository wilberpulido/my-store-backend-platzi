const express = require('express')
const cors = require('cors')
const routerApi = require('./routes')
const app = express();
const port = process.env.PORT || 3000;
const {logErrors,errorHandler,boomErrorHandler,ormErrorHandler} = require('./middlewares/ErrorHandler')
const {checkApiKey} = require('./middlewares/authHandler');
app.use(express.json())

const  whiteList = [
  'http://localhost:8080',
  'https://myapp.co',
];
const options = {
  origin: (origin,callback) =>{
    if (whiteList.includes(origin) || !origin){ // !origin para que acepte las request que viene del mismo origen
      callback(null,true)
    }
    callback(new Error('No permitido'))
  }
}
app.use(cors()) //Para todos
//app.use(cors(options))


// app.get('/',(req,res)=>{
//   res.send('Hola, mi server en mi express')
// })
// app.get('/new-route',(req,res)=>{
//   res.send('Nueva rutas')
// })
// app.get('/categories/:categoryId/products/:productId',(req,res)=>{
//   //const id = req.params.id;
//   const { categoryId,productId } = req.params;
//   res.json(
//     {
//       categoryId:categoryId,
//       productId:productId,
//     },
//   )
// })
app.get('/nueva-ruta',
checkApiKey
,
  (req,res)=>{
    res.send('Hola, soy una nueva ruta')
  }
)


routerApi(app);
app.use(logErrors);
app.use(ormErrorHandler)
app.use(boomErrorHandler);
app.use(errorHandler);


app.listen(port,()=>{
  console.log('My port '+port+' is ready');
})
