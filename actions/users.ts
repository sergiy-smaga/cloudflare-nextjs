"use server";

import { createUser } from "@/lib/user";
import { CreateUserDto, UserRole } from "@/types/user";
import { revalidateTag } from "next/cache";

export type Errors = {
  userName?: string;
  userEmail?: string;
  password?: string;
  role?: string;
};

export type FormState = {
  errors: Errors;
  success: boolean;
  message?: string;
};

export async function createUserForm(prevState: FormState, data: FormData) {
  const errors: Errors = {};

  try {
    const userData: CreateUserDto = {
      name: data.get("userName") as string,
      email: data.get("userEmail") as string,
      password: data.get("password") as string,
      role: (data.get("role") as UserRole) || UserRole.USER,
    };

    if (!userData.name) {
      errors.userName = "Name is required";
    }
    if (!userData.email) {
      errors.userEmail = "Email is required";
    }
    if (!userData.password || userData.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }
    if (Object.keys(errors).length > 0) {
      return { errors, success: false };
    }

    await createUser(userData);
    revalidateTag("users");

    return { errors, success: true, message: "User created successfully!" };
  } catch (error) {
    return {
      errors,
      success: false,
      message: (error as Error).message || "An unexpected error occurred",
    };
  }
}
