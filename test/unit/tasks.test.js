const express = require('express');
const request = require('supertest');
const { users } = require('../../dist/db/Database');
const tasksRouter = require('../../dist/routes/tasks');
const { createTaskEffect } = require('../../dist/effects/CreateTaskEffect');
const { v4: uuidv4 } = require('uuid');

// Mock createTaskEffect
jest.mock('../../dist/effects/CreateTaskEffect');

const app = express();
app.use(express.json());
app.use('/users/:user_id/tasks', tasksRouter);

describe('Tasks Router', () => {
   let userId;
   let user;

   beforeEach(() => {
      users.clear();
      userId = uuidv4();
      user = { id: userId, tasks: [] };
      users.set(userId, user);
   });

   afterEach(() => {
      jest.resetAllMocks();
   });

   it('should create a new task', async () => {
      const taskData = {
         "title": "Test Task",
         "description": "Test Description",
         "dueDate": "2024-06-30",
         "status": "To Do"
      }
         ;

      createTaskEffect.mockResolvedValue({ id: uuidv4(), ...taskData });

      const res = await request(app).post(`/users/${userId}/tasks`).send(taskData);
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('id');
      expect(createTaskEffect).toHaveBeenCalledWith({ userId, ...taskData });
   });

   it('should get all tasks for a user', async () => {
      const task = { id: uuidv4(), title: 'Test Task', description: 'Test Description', dueDate: new Date('2024-06-30'), status: 'To Do' };
      user.tasks.push(task);

      const res = await request(app).get(`/users/${userId}/tasks`);
      expect(res.status).toBe(200);
      expect(res.body).toEqual([{ ...task, dueDate: task.dueDate.toISOString() }]);

   });

   it('should get a specific task for a user', async () => {
      const task = { id: uuidv4(), title: 'Test Task', description: 'Test Description', dueDate: new Date('2024-06-30'), status: 'To Do' };
      user.tasks.push(task);

      const res = await request(app).get(`/users/${userId}/tasks/${task.id}`);
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ ...task, dueDate: task.dueDate.toISOString() });
   });

   it('should update a specific task for a user', async () => {
      const task = { id: uuidv4(), title: 'Test Task', description: 'Test Description', dueDate: new Date('2024-06-30'), status: 'To Do' };
      user.tasks.push(task);

      const updatedTaskData = {
         title: 'Updated Task',
         description: 'Updated Description',
         dueDate: '2024-07-01',
         status: 'In Progress',
      };

      const res = await request(app).put(`/users/${userId}/tasks/${task.id}`).send(updatedTaskData);
      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({
         ...updatedTaskData,
         dueDate: new Date(updatedTaskData.dueDate).toISOString(),
      });

   });

   it('should delete a specific task for a user', async () => {
      const task = { id: uuidv4(), title: 'Test Task', description: 'Test Description', dueDate: new Date('2024-06-30'), status: 'To Do' };
      user.tasks.push(task);

      const res = await request(app).delete(`/users/${userId}/tasks/${task.id}`);
      expect(res.status).toBe(204);
      expect(user.tasks).toHaveLength(0);
   });
});
