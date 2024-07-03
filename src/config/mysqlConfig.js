const mysql = require('mysql2');


// const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   // port: process.env.DB_PORT,
//   waitForConnections: true,
//   connectionLimit: 3,
//   queueLimit: 0
// });

const pool = mysql.createPool({
  host: '172.20.1.149',
  user: 'lresendiz',
  password: 'R3s3nd1z*',
  database: 'imp_internal',
  // port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 3,
  queueLimit: 0
});



module.exports = pool.promise();
