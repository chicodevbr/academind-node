const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'password', {
  dialect: 'mysql',
  host: 'localhost',
});

module.exports = sequelize;

// const mysql = require('mysql2');

// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   database: 'node-complete',
//   password: 'NodeComplete--#',
// });

// module.exports = pool.promise();
