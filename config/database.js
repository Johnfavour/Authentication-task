require('dotenv').config();
const { Sequelize } = require("sequelize");


const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
});

module.exports = {
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  dialect: 'postgres',
};


// require('dotenv').config();
// const { Sequelize } = require("sequelize");

// const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
//   host: process.env.DB_HOST,
//   dialect: 'postgres',
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false  // Adjust based on your PostgreSQL server setup
//     }
//   }
// });

// module.exports = sequelize;

// require('dotenv').config();
// const { Sequelize } = require('sequelize');

// // Log environment variables to ensure they are being read correctly
// console.log('DB_NAME:', process.env.DB_NAME);
// console.log('DB_USER:', process.env.DB_USER);
// console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
// console.log('DB_HOST:', process.env.DB_HOST);

// const sequelizeConfig = {
//   host: process.env.DB_HOST,
//   dialect: 'postgres', // Ensure this is a string and correctly set to 'postgres'
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false // Adjust based on your PostgreSQL server setup
//     }
//   },
//   logging: false // Disable logging; default: console.log
// };

// // Log the sequelize configuration
// console.log('Sequelize Config:', sequelizeConfig);

// const sequelize = new Sequelize(
//   process.env.DB_NAME, 
//   process.env.DB_USER, 
//   process.env.DB_PASSWORD, 
//   sequelizeConfig
// );

// // Test the database connection
// sequelize.authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });

// module.exports = sequelize;
