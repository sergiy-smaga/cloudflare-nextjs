import { z } from "zod";
import { UserRole } from "@/types/user";

export const createUserSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(255, "Name must be less than 255 characters"),
  email: z.email("Please enter a valid email address").trim(),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password must be less than 100 characters"),
  role: z.enum(UserRole),
});

export type CreateUserFormSchema = z.infer<typeof createUserSchema>;
