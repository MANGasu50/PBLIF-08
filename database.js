const db = require('knex')({
  client: 'mysql2',
  connection: {
    host: '0.0.0.0',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'operator'
  }
});

module.exports = db;
