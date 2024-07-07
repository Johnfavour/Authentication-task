// module.exports = {
//     testEnvironment: 'node',
//     verbose: true,
//     testPathIgnorePatterns: ['/node_modules/'],
    
//   };
module.exports = {
    testEnvironment: 'node',
    setupFilesAfterEnv: ['./jest.setup.js'] // Create this file to set up testing environment
  };