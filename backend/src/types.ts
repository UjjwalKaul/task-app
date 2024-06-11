import { z } from 'zod';

export const signUpInputs = z.object({
  email: z.string().email({ message: 'Invalid Email Address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' }),
  name: z.string().optional(),
});

export const signInInputs = z.object({
  email: z.string().email({ message: 'Invalid Email Address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' }),
});

export type SignupInput = z.infer<typeof signUpInputs>;
export type SigninInput = z.infer<typeof signInInputs>;

export const createTaskInput = z.object({
  title: z.string(),
  description: z.string(),
  status: z.boolean().optional().default(false),
  dueDate: z.date().optional(),
});
export const updateTaskInput = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  status: z.boolean().optional().default(false),
  dueDate: z.date().optional(),
});
export type CreateTaskInput = z.infer<typeof createTaskInput>;
export type UpdateTaskInput = z.infer<typeof updateTaskInput>;
