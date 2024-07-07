const { sequelize } = require('./models');

// Before all tests, sync Sequelize models
beforeAll(async () => {
  await sequelize.sync({ force: true }); // Force sync to recreate tables
});

// After all tests, close Sequelize connection
afterAll(async () => {
  await sequelize.close();
});
