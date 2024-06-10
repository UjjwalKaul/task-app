import { Hono } from 'hono';

export const taskRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

taskRouter.use('/*', async (c, next) => {
  next();
});
