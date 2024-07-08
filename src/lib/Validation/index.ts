import { z } from "zod";

export const signupValidation = z.object({
    name: z.string().min(2, { message: 'Too short' }),
    username: z.string().min(2, { message: 'Too short' }),
    email: z.string().email(),
    password: z.string().min(8, { message: 'Password must be atleast 8 length' }),
});

export const SigninValidation = z.object({
    email: z.string().email(),
    password: z.string().min(8, { message: 'Password must be atleast 8 length' }),
});