// require('dotenv').config();
// const express = require('express');
// const bodyParser = require('body-parser');
// const { sequelize } = require('./models');
// const authRoutes = require('./routes/auth');
// const organisationRoutes = require('./routes/organisation');

// const app = express();
// app.use(bodyParser.json());

// app.use('/auth', authRoutes);
// app.use('/api/organisations', organisationRoutes);

// const PORT = process.env.PORT || 5000;

// sequelize.authenticate().then(() => {
//   app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//   });
// });

// module.exports = app; 
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database'); // Ensure this path is correct
const authRoutes = require('./routes/auth');
const organisationRoutes = require('./routes/organisation');


const app = express();

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);
app.use('/api/organisations', organisationRoutes);

const PORT = process.env.PORT || 5000;

// Test the database connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    // Start the Express server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
    process.exit(1); // Exit the process with an error code
  });

module.exports = app;