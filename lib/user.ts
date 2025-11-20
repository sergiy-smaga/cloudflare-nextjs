"use server";

import { getDb, getDbAsync } from "@/lib/db";
import { CreateUserDto } from "@/types/user";

export const getUsers = async () => {
  const db = getDb();
  const value = await db.user.findMany();
  return value;
};

export const getUsersAsync = async () => {
  const db = await getDbAsync();
  const value = await db.user.findMany();
  console.log("value", value);
  return value;
};

export const createUser = async (newUser: CreateUserDto) => {
  const db = getDb();

  const user = await db.user.create({ data: newUser });
  return user;
};

export const getUserById = async (id: number) => {
  const db = getDb();
  const user = await db.user.findUnique({ where: { id } });
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

export const deleteUserById = async (id: number) => {
  const db = getDb();
  await db.user.delete({ where: { id } });
};
