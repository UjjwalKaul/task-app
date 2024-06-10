import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign } from 'hono/jwt';
import { signUpInputs } from '../../../common/types';
import { signInInputs } from '../../../common/types';

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post('/signup', async (c) => {
  const body = await c.req.json();
  const { success, error } = signUpInputs.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({ message: error.message });
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name,
      },
    });
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.text(jwt);
  } catch (error) {
    c.status(411);
    return c.json({ error });
  }
});

userRouter.post('/signin', async (c) => {
  const body = await c.req.json();
  const { success, error } = signInInputs.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({ message: error.message });
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
        password: body.password,
      },
    });
    if (!user) {
      c.status(403);
      return c.json({ message: 'Invalid Credentials' });
    }
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.text(jwt);
  } catch (error) {
    c.status(411);
    return c.json({ error });
  }
});
