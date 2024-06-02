import { Effect } from "effect";
import { users } from '../db/Database';
import { Task } from '../models/Task';

interface UpdateTaskInput {
   userId: string;
   taskId: string;
   title: string;
   description: string;
   dueDate: string;
   status: 'To Do' | 'In Progress' | 'Done';
}

export const updateTaskEffect = ({ userId, taskId, title, description, dueDate, status }: UpdateTaskInput): Effect.Effect<Task, Error> => {
   if (!users.has(userId)) {
      return Effect.fail(new Error('User not found'));
   }
   const user = users.get(userId)!;

   const taskIndex = user.tasks.findIndex(t => t.id === taskId);
   if (taskIndex === -1) {
      return Effect.fail(new Error('Task not found for this user'));
   }
   
   const updatedTask = { ...user.tasks[taskIndex] };
   
   if (title && typeof title !== 'string') {
      return Effect.fail(new Error('Title must be a string'));
   }
   if (description && typeof description !== 'string') {
      return Effect.fail(new Error('Description must be a string'));
   }
   if (dueDate) {
      const parsedDate = Date.parse(dueDate);
      if (isNaN(parsedDate)) {
         return Effect.fail(new Error('Invalid date format'));
      }
   }
   if (status && typeof status !== 'string' && ['To Do', 'In Progress', 'Done'].includes(status)) {
      return Effect.fail(new Error('Invalid status'));
   }

   updatedTask.title = title;
   updatedTask.description = description;
   updatedTask.dueDate = new Date(dueDate);
   updatedTask.status = status;
   user.tasks[taskIndex] = updatedTask;

   return Effect.succeed(updatedTask );

};


