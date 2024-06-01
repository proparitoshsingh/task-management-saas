import { Effect } from "effect"
import { v4 as uuidv4 } from 'uuid';
import { users } from '../db/Database';
import { Task } from '../models/Task';

interface CreateTaskInput {
   userId: string;
   title: string;
   description: string;
   dueDate: string;
   status: 'To Do' | 'In Progress' | 'Done';
}

export const createTaskEffect = ({ userId, title, description, dueDate, status }: CreateTaskInput): Effect.Effect<Task,Error> => {
   if (!users.has(userId)) {
      Effect.fail(new Error('User not found'));
   }
   const user = users.get(userId)!;
   const taskId = uuidv4();
   const task: Task = { id: taskId, title, description, dueDate: new Date(dueDate), status };
   user.tasks.push(task);
   return Effect.succeed(task);
};
