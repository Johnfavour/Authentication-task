// require('dotenv').config();
// const { Pool } = require('pg');
// const { Sequelize } = require('sequelize');

// const connectionString = process.env.POSTGRES_URL;

// console.log("Initializing Sequelize with:", connectionString); // Debug statement

// const adminPool = new Pool({
//     connectionString: connectionString,
// });

// const databaseName = new URL(connectionString).pathname.split("/")[1].replace('%2F', '');

// const createDatabaseIfNotExists = async () => {
//     const client = await adminPool.connect();
//     try {
//         const result = await client.query(`SELECT 1 FROM pg_database WHERE datname = $1`, [databaseName]);
//         if (result.rowCount === 0) {
//             await client.query(`CREATE DATABASE ${databaseName}`);
//             console.log(`Database ${databaseName} created successfully`);
//         } else {
//             console.log(`Database ${databaseName} already exists`);
//         }
//     } catch (error) {
//         console.error("Error checking/creating database:", error);
//         throw error;
//     } finally {
//         client.release();
//     }
// };

// const sequelize = new Sequelize(connectionString, {
//     dialect: 'postgres', // Ensure the dialect is explicitly set to 'postgres'
//     logging: false,
// });

// const dbConnected = new Promise(async (resolve, reject) => {
//     try {
//         await createDatabaseIfNotExists();
//         await sequelize.authenticate();
//         console.log("Connected to database");
//         resolve();
//     } catch (error) {
//         console.error("Failed to connect to database:", error);
//         reject(error);
//     }
// });

// module.exports = {
//     sequelize,
//     dbConnected
// };



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

