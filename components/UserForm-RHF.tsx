"use client";

import {
  FieldErrors,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserRole } from "@/types/user";
import { createUserSchema, type CreateUserFormSchema } from "@/lib/validation";
import { createUserAction } from "@/actions/users-RHF";
import { DevTool } from "@hookform/devtools";

let render = 0;

export default function UserFormRHF() {
  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitSuccessful,
      isDirty,
      isValid,
      isSubmitting,
      isSubmitted,
    },
    reset,
    setError,
    control,
  } = useForm<CreateUserFormSchema>({
    resolver: zodResolver(createUserSchema),
    mode: "onTouched",
    // defaultValues: actionState.formData,
  });

  const onSubmit: SubmitHandler<CreateUserFormSchema> = async (data) => {
    const result = await createUserAction(data);

    if (!result.success) {
      if (result.errors) {
        for (const [field, messages] of Object.entries(result.errors)) {
          if (messages && messages.length > 0) {
            setError(field as keyof CreateUserFormSchema, {
              type: "server",
              message: messages.join(", "),
            });
          }
        }
      }

      return;
    }
    reset();
  };

  const onInvalid: SubmitErrorHandler<CreateUserFormSchema> = (
    error: FieldErrors<CreateUserFormSchema>
  ) => {
    console.log("Form validation errors:", error);
  };

  render++;
  return (
    <div className="paper">
      <h2 className="text-xl font-bold mb-4">
        RHF : Add New User - rerender ({render / 2})
      </h2>

      {isSubmitSuccessful && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
          <strong className="font-bold">Success!</strong>
          <span className="block sm:inline"></span>
        </div>
      )}

      {isSubmitted && !isSubmitSuccessful && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"></span>
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit, onInvalid)}
        className="space-y-4"
        noValidate
      >
        <div>
          <label className="block text-sm font-medium mb-1">
            Name
            <input {...register("name")} type="text" />
          </label>
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Email
            <input {...register("email")} type="email" />
          </label>
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Password
            <input {...register("password")} type="password" />
          </label>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Role
            <select {...register("role")}>
              <option value={UserRole.USER}>User</option>
              <option value={UserRole.ADMIN}>Admin</option>
            </select>
          </label>
          {errors.role && (
            <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !isDirty || !isValid}
          className="btn btn-primary w-full"
        >
          {isSubmitting ? "Creating User..." : "Create User"}
        </button>
      </form>
      <DevTool control={control} />
    </div>
  );
}
