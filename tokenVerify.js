const jwt = require('jsonwebtoken');
const secret = 'myDogSecret';//Esto tiene que estar en una variable de entorno, dado que es la clave secreta de cifrado

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTY3NjIyNzI0M30.ZSRee4GRMUoSraBte4ahOzbh2ZYxTgb_gypqStoU7nU';
function verifyToken(token,secret){
  return jwt.verify(token,secret);
}

const payload = verifyToken(token,secret);

console.log(payload);
