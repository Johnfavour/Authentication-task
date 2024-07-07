const request = require('supertest');
const app = require('../server');
const { sequelize } = require('../models');


beforeAll(async () => {
  // await sequelize.authenticate(); // Ensures the database is synced before tests
});
afterAll(async() => {
  // await sequelize.close();
})
describe('Authentication and Organisation Endpoints', () => {


  describe('POST /auth/register', () => {
    it('should register a user successfully with default organisation', async () => {
      const res = await request(app)
        .post('/auth/register')
        .send({
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          password: 'password',
          phone: '123456789'
        });

      console.log('Registration Response:', res.body);

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('data');
      expect(res.body.data.user.firstName).toBe('John');
      expect(res.body.data.user.lastName).toBe('Doe');
      expect(res.body.data.user.email).toBe('john@example.com');
    });

    it('should return validation errors for missing required fields', async () => {
      const res = await request(app)
        .post('/auth/register')
        .send({
          lastName: 'Doe',
          email: 'john@example.com',
          password: 'password',
          phone: '123456789'
        });

      expect(res.status).toBe(422);
      expect(res.body).toHaveProperty('errors');
      expect(res.body.errors).toBeInstanceOf(Array);
      expect(res.body.errors).not.toHaveLength(0);
    });

    it('should return validation errors for duplicate email', async () => {
      try {
        // Register the first user with a specific email
        await request(app)
          .post('/auth/register')
          .send({
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            password: 'password',
            phone: '123456789'
          });
    
        // Attempt to register another user with the same email
        const res = await request(app)
          .post('/auth/register')
          .send({
            firstName: 'Jane',
            lastName: 'Smith',
            email: 'john@example.com', 
            password: 'password',
            phone: '987654321'
          });
    
        expect(res.status).toBe(422);
        expect(res.body).toHaveProperty('errors');
        expect(res.body.errors).toBeInstanceOf(Array);
        expect(res.body.errors).not.toHaveLength(0);
        expect(res.body.errors[0].field).toBe('email');
        expect(res.body.errors[0].message).toBe('Email already exists');
      } catch (error) {
        console.error('Error during registration:', error.message);
        throw error; // Rethrow error to fail the test
      }
    });
  }); 

  describe('POST /auth/login', () => {
    it('should login a user successfully', async () => {
      // Register a user first
      await request(app)
        .post('/auth/register')
        .send({
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          password: 'password',
          phone: '123456789'
        });

      // Login with the registered user's credentials
      const res = await request(app)
        .post('/auth/login')
        .send({
          email: 'john@example.com',
          password: 'password'
        });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('data');
      expect(res.body.data.user.firstName).toBe('John');
      expect(res.body.data.user.email).toBe('john@example.com');
      expect(typeof res.body.data.accessToken).toBe('string'); // Check if accessToken is a string
    });

    it('should return authentication failed for invalid credentials', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'invalidpassword'
        });

      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty('message');
      expect(res.body.message).toContain('Authentication failed');
    });

  }); 

  describe('GET /api/organisations', () => {
    it('should return all organisations the user belongs to or created', async () => {
      let registerRes;
      try {
        registerRes = await request(app)
          .post('/auth/login')
          .send({
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            password: 'password',
            phone: '123456789'
          });
          console.log(registerRes);
        // it ensures the registration was successful
        if (registerRes.status !== 200) {
          console.error('Registration failed. Status:', registerRes.status);
          console.error('Response:', registerRes.body);
          throw new Error('Registration failed');
        }

        console.log('Registration Response:', registerRes.body); // Log registration response

        // Checks if the accessToken is present in the response
        if (registerRes.body && registerRes.body.data && registerRes.body.data.accessToken) {
          const accessToken = registerRes.body.data.accessToken;

          // Creates an organisation for the user
          const createOrgRes = await request(app)
            .post('/api/organisations')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({
              name: "John's Organisation",
              description: 'This is John Doe\'s organisation'
            });

          expect(createOrgRes.status).toBe(201);

          // Fetches all the organisations for the user
          const getOrgRes = await request(app)
            .get('/api/organisations')
            .set('Authorization', `Bearer ${accessToken}`);

          console.log('Get Organisations Response:', getOrgRes.body); // Log organisations response

          expect(getOrgRes.status).toBe(200);
          expect(getOrgRes.body).toHaveProperty('data');
          expect(getOrgRes.body.data.organisations).toBeInstanceOf(Array);
          expect(getOrgRes.body.data.organisations).not.toHaveLength(0);
          expect(getOrgRes.body.data.organisations[0]).toHaveProperty('name');
          expect(getOrgRes.body.data.organisations[0].name).toContain('John');
        } else {
          throw new Error('Access token not found in registration response');
        }
      } catch (error) {
        console.error('Error during test:', error.message);
        if (registerRes && registerRes.body) {
          console.error('Response body:', registerRes.body);
        }
        throw error; // Rethrow error to fail the test 
      }
    });

    
  }); 

  // afterAll(async () => {
   
  //   await sequelize.close();
  // });
});
