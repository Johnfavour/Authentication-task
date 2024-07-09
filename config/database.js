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
      require: false,
      rejectUnauthorized: false 
    }
  },
  pool: {
    max: 5,
    min: 0, 
    acquire: 30000,
    idle: 10000,
  },
  logging: console.log,
});

module.exports = sequelize;