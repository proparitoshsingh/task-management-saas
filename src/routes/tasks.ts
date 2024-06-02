import express, { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { users } from '../db/Database';
import { Task } from '../models/Task';
import { createTaskEffect} from '../effects/CreateTaskEffect';
import { getTasksEffect } from '../effects/GetTasksEffect';
import { getTaskByIdEffect } from '../effects/GetTaskByIDEffect';
import { updateTaskEffect } from '../effects/UpdateTaskEffect';
import { deleteTaskEffect } from '../effects/DeleteTaskEffect';

type TaskStatus = "To Do" | "In Progress" | "Done";

interface TaskRequestBody {
   title: string;
   description: string;
   dueDate: string;
   status: TaskStatus;
}

const router = express.Router({ mergeParams: true });

router.post('/',async (req: Request<{ user_id: string }, {}, TaskRequestBody>, res: Response) => {
   const { user_id } = req.params;
   const { title, description, dueDate, status } = req.body;

   try {
      const task = await createTaskEffect({ userId: user_id, title, description, dueDate, status });
      res.status(201).send(task);
   } catch (err: any) {
      res.status(404).send({ error: err.message });
   }
});

router.get('/',async (req: Request<{ user_id: string }, {}, {}>, res: Response) => {
   const { user_id } = req.params;

   try {
      const tasks = await getTasksEffect(user_id);
      res.send(tasks);
   } catch (err: any) {
      res.status(404).send({ error: err.message });
   }
});

router.get('/:task_id',async (req: Request<{ user_id: string; task_id: string }, {}, {}>, res: Response) => {
   const { user_id, task_id } = req.params;

   try {
      const task = await getTaskByIdEffect(user_id, task_id);
      res.send(task);
   } catch (err: any) {
      res.status(404).send({ error: err.message });
   }
});

router.put('/:task_id',async (req: Request<{ user_id: string; task_id: string }, {}, TaskRequestBody>, res: Response) => {
   const { user_id, task_id } = req.params;
   const { title, description, dueDate, status } = req.body;

   try {
      const task = await updateTaskEffect({ userId: user_id, taskId: task_id, title, description, dueDate, status });
      res.status(200).send(task);
   } catch (err: any) {
      res.status(404).send({ error: err.message });
   }
});

router.delete('/:task_id',async (req: Request<{ user_id: string; task_id: string }, {}, {}>, res: Response) => {
   const { user_id, task_id } = req.params;

   try {
      await deleteTaskEffect(user_id, task_id);
      console.log("Task deleted successfully!");
      res.status(204).send();
   } catch (err: any) {
      res.status(404).send({ error: err.message });
   }
});

module.exports = router;
