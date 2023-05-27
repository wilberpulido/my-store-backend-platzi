const boom = require('@hapi/boom');
const { config } = require('../config/config');

function checkApiKey(req,res,next){
  const apiKey = req.headers['api'];
  console.log('checkApi')
  if( apiKey === config.apiKey ){
    next();
  }else{
    next(boom.unauthorized());
  }
}

function checkAdminRole(req,res,next){
  const user = req.user;
  console.log(user.role)
  if (user.role === 'admin'){
    next();
  }else{
    next(boom.unauthorized())
  }
}

function checkRoles(...roles){
  return (req,res,next) => {
    const user = req.user ?? '';
    if(roles.includes(user.role)){
      next();
    }else{
      next(boom.unauthorized())
    }
  }
}

module.exports = { checkApiKey,checkAdminRole,checkRoles };
