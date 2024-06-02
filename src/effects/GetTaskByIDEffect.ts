import { Effect } from "effect";
import { users } from '../db/Database';
import { Task } from '../models/Task';

export const getTaskByIdEffect = (userId: string, taskId: string): Effect.Effect<Task, Error> => {
   if (!users.has(userId)) {
      return Effect.fail(new Error('User not found'));
   }
   const user = users.get(userId)!;
   const task = user.tasks.find(t => t.id === taskId);
   if (!task) {
      return Effect.fail(new Error('Task not found'));
   }
   return Effect.succeed(task);
};
