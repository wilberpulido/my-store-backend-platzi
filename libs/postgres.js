const { Client } = require('pg');

async function getConnection(){
  const client = new Client({
    host: 'localhost',
    post: 5432,
    user:'my_store_user',
    password: 'password',
    database:'my_store',
  });

  await client.connect();

  return client;
}

module.exports = getConnection;
