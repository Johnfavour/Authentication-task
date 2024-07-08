// require('dotenv').config();
// const express = require('express');
// const bodyParser = require('body-parser');
// const { sequelize, dbConnected } = require('./config/database');
// const authRoutes = require('./routes/auth');
// const organisationRoutes = require('./routes/organisation');

// const app = express();
// app.use(bodyParser.json());

// app.use('/auth', authRoutes);
// app.use('/api/organisations', organisationRoutes);

// const port = process.env.PORT || 5000;

// sequelize.sync()
//     .then(() => {
//         console.log("Database & tables created!");
//     })
//     .catch((error) => {
//         console.error("Unable to sync database:", error);
//     });

// dbConnected
//     .then(() => {
//         app.listen(port, () => {
//             console.log(`Server is running on port ${port}`);
//         });
//     })
//     .catch((error) => {
//         console.error("Server failed to start due to database connection error:", error);
//         process.exit(1);
//     });

// module.exports = app;







require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
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