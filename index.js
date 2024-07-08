require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database'); // Adjust the path as per your project structure
const authRoutes = require('./routes/auth');
const organisationRoutes = require('./routes/organisation');

const app = express();
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/api/organisations', organisationRoutes);

const PORT = process.env.PORT || 5000;

sequelize.authenticate().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

module.exports = app;
