const express = require('express');
const request = require('supertest');
const bodyParser = require('body-parser');
const usersRouter = require('../../dist/routes/users');
const tasksRouter = require('../../dist/routes/tasks');
const { users } = require('../../dist/db/Database');

const app = express();
app.use(bodyParser.json());
app.use('/users', usersRouter);
app.use('/users/:user_id/tasks', tasksRouter);

describe('Integration Tests', () => {
   beforeEach(() => {
      users.clear();
   });

   it('should create a user and add tasks to that user', async () => {

      // Create a new user
      const userRes = await request(app).post('/users').send();
      expect(userRes.status).toBe(201);
      const userId = userRes.body.id;

      // Add a task to the user
      const taskData = {
         title: 'Test Task',
         description: 'Test Description',
         dueDate: '2024-06-30T00:00:00.000Z',
         status: 'To Do',
      };

      const taskRes = await request(app).post(`/users/${userId}/tasks`).send(taskData);
      expect(taskRes.status).toBe(201);
      expect(taskRes.body.value).toHaveProperty('id');

      // Retrieve the task
      const getTasksRes = await request(app).get(`/users/${userId}/tasks`);
      expect(getTasksRes.status).toBe(200);
      expect(getTasksRes.body.value).toHaveLength(1);
      expect(getTasksRes.body.value[0]).toMatchObject(taskData);

      // Update the task
      const updatedTaskData = {
         title: 'Updated Task',
         description: 'Updated Description',
         dueDate: '2024-07-01T00:00:00.000Z',
         status: 'In Progress',
      };
      
      const taskId = taskRes.body.value.id;
      const updateTaskRes = await request(app).put(`/users/${userId}/tasks/${taskId}`).send(updatedTaskData);
      expect(updateTaskRes.status).toBe(200);
      expect(updateTaskRes.body.value).toMatchObject(updatedTaskData);

      // Delete the task
      const deleteTaskRes = await request(app).delete(`/users/${userId}/tasks/${taskId}`).send();
      expect(deleteTaskRes.status).toBe(204);

      // Verify task deletion
      const verifyTasksRes = await request(app).get(`/users/${userId}/tasks`);
      expect(verifyTasksRes.status).toBe(200);
      expect(verifyTasksRes.body.value).toHaveLength(0);
   });
});
