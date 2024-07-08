require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.POSTGRES_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false  // Adjust based on your PostgreSQL server setup
    }
  },
  logging: false // Disable logging; default: console.log
});

// Test the database connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection to PostgreSQL database has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
