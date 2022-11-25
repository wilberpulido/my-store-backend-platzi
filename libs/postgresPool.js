const { Pool } = require('pg');
const { config } = require('../config/config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

// const pool = new Pool({
//   host: 'localhost',
//   post: 5432,
//   user:'my_store_user',
//   password: 'password',
//   database:'my_store',
// });
const pool = new Pool({connectionString: URI})

module.exports = pool;
