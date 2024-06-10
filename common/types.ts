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
