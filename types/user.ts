export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}

// export interface User {
//   id: number;
//   name: string | null;
//   email: string;
//   role: UserRole;
//   phone: string | null;
//   password: string;
// }

export interface CreateUserDto {
  email: string;
  name: string;
  password: string;
  role?: UserRole;
}
