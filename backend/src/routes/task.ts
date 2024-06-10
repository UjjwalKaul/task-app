import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

export const taskRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

taskRouter.use('/*', async (c, next) => {
  next();
});

taskRouter.get('/bulk', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const tasks = await prisma.task.findMany();
  return c.json({ tasks });
});

taskRouter.get('/:id', async (c) => {
  const taskId = c.req.param('id');
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const task = await prisma.task.findUnique({
      where: {
        id: parseInt(taskId),
      },
    });
    if (task) {
      return c.json({ task });
    } else {
      c.status(404);
      return c.json({ error: 'Task not found' });
    }
  } catch (error) {
    c.status(500);
    return c.json({ error: 'An error occurred while retrieving the task' });
  }
});

taskRouter.post('/', async (c) => {
  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const task = await prisma.task.create({
    data: {
      title: body.title,
      description: body.description,
      status: body.status,
      dueDate: body.dueDate,
      userId: 1,
    },
  });
  return c.text('Created task ' + task.id);
});

taskRouter.put('/', async (c) => {
  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const task = await prisma.task.update({
      where: {
        id: body.id,
      },
      data: {
        title: body.title,
        description: body.description,
        status: body.status,
        dueDate: body.dueDate,
      },
    });
    return c.text('Updated task ' + task.id);
  } catch (error) {
    c.status(404);
    return c.json({ error });
  }
});

taskRouter.delete('/:id', async (c) => {
  const taskId = c.req.param('id');
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    await prisma.task.delete({
      where: {
        id: parseInt(taskId),
      },
    });
    return c.text('Deleted task ' + taskId);
  } catch (error) {
    c.status(404);
    return c.json({ error: 'Task not found' });
  }
});
