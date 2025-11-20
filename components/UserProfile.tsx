import { UserRole } from "../types/user";
import type { User } from "@prisma/client";

export default async function UserProfile({ user }: { user: User }) {
  return (
    <div className="paper">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">{user.name}</h1>
        <div className="flex items-center">
          <span
            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                ${
                  user.role === UserRole.ADMIN
                    ? "bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100"
                    : "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                }`}
          >
            {user.role}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              User ID
            </h3>
            <p className="mt-1 text-gray-900 dark:text-gray-100">{user.id}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Email
            </h3>
            <p className="mt-1 text-gray-900 dark:text-gray-100">
              {user.email}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Created At
            </h3>
            <p className="mt-1 text-gray-900 dark:text-gray-100">
              {new Date().toLocaleString()}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Last Updated
            </h3>
            <p className="mt-1 text-gray-900 dark:text-gray-100">
              {new Date().toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
