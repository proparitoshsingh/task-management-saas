const express = require('express');
const request = require('supertest');
const { users } = require('../../dist/db/Database');
const usersRouter = require('../../dist/routes/users');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json());
app.use('/users', usersRouter);

describe('Users Router', () => {
   beforeEach(() => {
      users.clear();
   });

   it('should create a new user', async () => {
      const res = await request(app).post('/users').send();
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('id');
      expect(users.has(res.body.id)).toBe(true);
   });
});
