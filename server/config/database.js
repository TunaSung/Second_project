require('dotenv').config();
const { Sequelize } = require('sequelize')

// const sqlize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASS,
//   {
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     dialect: 'mysql',
//     logging: false,
//     dialectOptions: { charset: 'utf8mb4' }
//   }
// );

const sqlize = new Sequelize(process.env.MYSQL_URL, {
  dialect: 'mysql',
  logging: false,
  dialectOptions: { charset: 'utf8mb4' }
});

async function connectDB(opts = {}) {
  await sqlize.authenticate();
  if (opts.sync) await sqlize.sync();
  return sqlize;
}

module.exports = sqlize;
module.exports.connectDB = connectDB;