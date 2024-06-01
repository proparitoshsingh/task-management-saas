import express, { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { users } from '../db/Database';
import { Task } from '../models/Task';

type TaskStatus = "To Do" | "In Progress" | "Done";

interface TaskRequestBody {
   title: string;
   description: string;
   dueDate: string;
   status: TaskStatus;
}

const router = express.Router({ mergeParams: true });

router.post('/', (req: Request<{ user_id: string }, {}, TaskRequestBody>, res: Response) => {
   const { user_id } = req.params;
   const { title, description, dueDate, status } = req.body;

   if (!users.has(user_id)) {
      return res.status(404).send({ error: 'User not found' });
   }

   const user = users.get(user_id)!;
   const taskId = uuidv4();
   const task: Task = { id: taskId, title, description, dueDate: new Date(dueDate), status };

   user.tasks.push(task);
   res.status(201).send(task);
});

router.get('/', (req: Request<{ user_id: string }, {}, {}>, res: Response) => {
   const { user_id } = req.params;

   if (!users.has(user_id)) {
      return res.status(404).send({ error: 'User not found' });
   }

   const user = users.get(user_id)!;
   res.send(user.tasks);
});

router.get('/:task_id', (req: Request<{ user_id: string; task_id: string }, {}, {}>, res: Response) => {
   const { user_id, task_id } = req.params;

   if (!users.has(user_id)) {
      return res.status(404).send({ error: 'User not found' });
   }

   const user = users.get(user_id)!;
   const task = user.tasks.find((t: Task) => t.id === task_id);

   if (!task) {
      return res.status(404).send({ error: 'Task not found' });
   }

   res.send(task);
});

router.put('/:task_id', (req: Request<{ user_id: string; task_id: string }, {}, TaskRequestBody>, res: Response) => {
   const { user_id, task_id } = req.params;
   const { title, description, dueDate, status } = req.body;

   if (!users.has(user_id)) {
      return res.status(404).send({ error: 'User not found' });
   }

   const user = users.get(user_id)!;
   const task = user.tasks.find((t: Task) => t.id === task_id);

   if (!task) {
      return res.status(404).send({ error: 'Task not found' });
   }

   if (title) task.title = title;
   if (description) task.description = description;
   if (dueDate) task.dueDate = new Date(dueDate);
   if (status) task.status = status;

   res.send(task);
});

router.delete('/:task_id', (req: Request<{ user_id: string; task_id: string }, {}, {}>, res: Response) => {
   const { user_id, task_id } = req.params;

   if (!users.has(user_id)) {
      return res.status(404).send({ error: 'User not found' });
   }

   const user = users.get(user_id)!;
   const taskIndex = user.tasks.findIndex((t: Task) => t.id === task_id);

   if (taskIndex === -1) {
      return res.status(404).send({ error: 'Task not found' });
   }

   user.tasks.splice(taskIndex, 1);
   res.status(204).send();
});

export default router;
