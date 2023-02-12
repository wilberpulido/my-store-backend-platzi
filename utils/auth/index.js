const passport = require('passport');

const LocalStrategy = require('./strategies/localStrategy');
// Tantas estrategias de logeo como quieras e instales
//const twitterStrategy = require('./strategies/twitterStrategy')
//const googleStrategy = require('./strategies/googleStrategy')
//const facebookStrategy = require('./strategies/facebookStrategy')


passport.use(LocalStrategy);
