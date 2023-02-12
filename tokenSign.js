const jwt = require('jsonwebtoken');
const secret = 'myDogSecret';//Esto tiene que estar en una variable de entorno, dado que es la clave secreta de cifrado

const payload  = { //Lo que vamos a encryptar dentro del token
  sub: 1,//parte del estandar, una manera de identificar al usuario, es el estadar minimo
  role:'customer', //extra
}
function signToken(payload,secret){
  return jwt.sign(payload,secret);
}

const token = signToken(payload,secret);

console.log(token);
