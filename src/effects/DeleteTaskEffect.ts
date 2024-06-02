import { Effect } from "effect";
import { users } from '../db/Database';


export const deleteTaskEffect = (userId: string, taskId: string): Effect.Effect<null, Error> => {
   if (!users.has(userId)) {
      return Effect.fail(new Error('User not found'));
   }
   const user = users.get(userId)!;
   const taskIndex = user.tasks.findIndex(t => t.id === taskId);
   if (taskIndex === -1) {
      return Effect.fail(new Error('Task not found for this user'));
   }

   user.tasks.splice(taskIndex, 1);
   return Effect.succeed(null);
};
