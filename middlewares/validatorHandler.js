const boom = require('@hapi/boom');

function validatorHandler (schema,property){
  console.log('validatorHandler')
  return (req,res,next) => {
    const data = req[property];
    console.log(data);
    const {error} = schema.validate(data,{abortEarly:false});
    if (error){
      next(boom.badRequest(error))
    }
    next();
  }
}

module.exports = validatorHandler;
