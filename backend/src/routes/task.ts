import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { verify } from 'hono/jwt';

export const taskRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

taskRouter.use('/*', async (c, next) => {
  const authHeader = c.req.header('authorization') || '';
  try {
    const user = await verify(authHeader, c.env.JWT_SECRET);
    if (user) {
      c.set('userId', String(user.id));
    } else {
      c.status(401);
      return c.json({ message: 'Unauthorized' });
    }
  } catch (error) {}
  await next();
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
  const userId = c.get('userId');
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const task = await prisma.task.create({
    data: {
      title: body.title,
      description: body.description,
      status: body.status,
      dueDate: body.dueDate,
      userId: Number(userId),
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
