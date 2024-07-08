// require('dotenv').config();
// const { Sequelize } = require("sequelize");

// const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
//   host: process.env.DB_HOST,
//   dialect: 'postgres',
// });

// module.exports = {
//   database: process.env.DB_NAME,
//   username: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   host: process.env.DB_HOST,
//   dialect: 'postgres',
// };


const { Sequelize } = require('sequelize');
const pg = require('pg');
require('dotenv').config();

const postgresUrl = process.env.POSTGRES_URL;

if (!postgresUrl) {
  console.error("POSTGRES_URL is not set in environment variables.");
  process.exit(1);
}

const sequelize = new Sequelize(postgresUrl, {
  dialect: 'postgres',
  dialectModule: pg,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // You might want to change this to true in production
    }
  }
});

module.exports = sequelize;