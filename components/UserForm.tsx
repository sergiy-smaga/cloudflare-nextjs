"use client";

import { useActionState } from "react";
import { createUserForm, FormState } from "@/actions/users";
import { UserRole } from "@/types/user";

export default function UserForm() {
  const initialState: FormState = {
    errors: {},
    success: false,
    message: "",
  };

  const [state, formAction, isPending] = useActionState(
    createUserForm,
    initialState
  );

  return (
    <div className="paper">
      <h2 className="text-xl font-bold mb-4">Add New User</h2>

      {state.success && state.message && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
          <strong className="font-bold">Success!</strong>
          <span className="block sm:inline">{state.message}</span>
        </div>
      )}

      {!state.success && state.message && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline">{state.message} </span>
        </div>
      )}

      <form action={formAction} className="space-y-4" noValidate>
        <div>
          <label>Name</label>
          <input name="userName" />
          {state.errors.userName && (
            <p className="text-sm text-red-600 mt-1">{state.errors.userName}</p>
          )}
        </div>

        <div>
          <label>Email</label>
          <input type="email" name="userEmail" />
          {state.errors.userEmail && (
            <p className="text-sm text-red-600 mt-1">
              {state.errors.userEmail}
            </p>
          )}
        </div>

        <div>
          <label>Password</label>
          <input type="password" name="password" />
          {state.errors.password && (
            <p className="text-sm text-red-600 mt-1">{state.errors.password}</p>
          )}
        </div>

        <div>
          <label>Role</label>
          <select name="role">
            <option value={UserRole.USER}>User</option>
            <option value={UserRole.ADMIN}>Admin</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full btn btn-primary"
          disabled={isPending}
        >
          {isPending ? "Adding..." : "Add User"}
        </button>
      </form>
    </div>
  );
}
