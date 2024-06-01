import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/users';
import taskRoutes from './routes/tasks';

const app: Application = express();
const PORT: number = parseInt(process.env.PORT as string, 10) || 3000;

app.use(bodyParser.json());

app.use('/users', userRoutes);
app.use('/users/:user_id/tasks', taskRoutes);

app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});
