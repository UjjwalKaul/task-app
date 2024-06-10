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

taskRouter.get('/task/bulk', async (c) => {
  return c.text('Tasks');
});

taskRouter.get('/task:id', async (c) => {
  return c.text('Task by id');
});

taskRouter.post('/task', async (c) => {
  return c.text('Create task');
});

taskRouter.put('/task', async (c) => {
  return c.text('Update task');
});

taskRouter.delete('/task', async (c) => {
  return c.text('Delete task');
});
