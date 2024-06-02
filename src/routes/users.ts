import express, { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { users } from '../db/Database';
import { User } from '../models/User';

const router = express.Router();

router.post('/', (req: Request, res: Response) => {
   const userId: string = uuidv4();
   const newUser: User = { id: userId, tasks: [] };
   users.set(userId, newUser);
   res.status(201).send({ id: userId });
});

module.exports = router;
