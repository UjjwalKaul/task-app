import { Hono } from 'hono';
import { userRouter } from './routes/user';
import { taskRouter } from './routes/task';

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

app.route('api/v1/user', userRouter);
app.route('api/v1/task', taskRouter);
export default app;
