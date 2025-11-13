import { z } from "zod";

export const treeifyError = z.treeifyError;

export const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string(),
});

export const registerSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Only letters, numbers, and underscores"),
  email: z.email("Invalid email"),
  password: z
    .string()
    .min(8, "Password must be 8+ characters")
    .regex(
      /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Needs uppercase, lowercase & number"
    ),
});
