"use server";

import { createUser } from "@/lib/user";
import { revalidateTag } from "next/cache";
import { CreateUserFormSchema, createUserSchema } from "@/lib/validation";

export type FieldErrors = {
  userName?: string[];
  userEmail?: string[];
  password?: string[];
  role?: string[];
};

export type FormState = {
  errors?: FieldErrors;
  message?: string;
  success?: boolean;
  formData?: CreateUserFormSchema;
};

export async function createUserAction(
  formData: CreateUserFormSchema
): Promise<FormState> {
  const validatedData = createUserSchema.safeParse(formData);
  await new Promise((resolve) => setTimeout(resolve, 1500));

  if (!validatedData.success) {
    return {
      success: false,
      errors: validatedData.error.flatten((issue) => issue.message).fieldErrors,
      message: "Validation failed. User not created.",
    };
  }

  await createUser(validatedData.data);

  revalidateTag("users");

  return {
    success: true,
    message: "User created successfully!",
  };
}
