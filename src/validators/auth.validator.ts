import { z } from "zod";

export const SignUpDto = z.object({
  email: z.email(),
  password: z.string().min(5).max(64),
});

export const LoginDto = z.object({
  email: z.email(),
  password: z.string(),
});

export type SignUpInput = z.infer<typeof SignUpDto>;
export type LoginInput = z.infer<typeof LoginDto>;