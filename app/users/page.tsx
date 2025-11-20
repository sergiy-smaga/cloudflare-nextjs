import { Suspense } from "react";
import UserListContainer from "../../components/UserListContainer";
import UserForm from "../../components/UserForm";
import UserFormRHF from "@/components/UserForm-RHF";
import Loading from "./loading";

export const dynamic = "force-dynamic";
export const experimental_ppr = true;

export default function UsersPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h3>Users</h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="paper">
            <h4 className="mb-4">User List</h4>
            <Suspense fallback={<Loading />}>
              <UserListContainer />
            </Suspense>
          </div>
        </div>

        <div className="lg:col-span-1">
          <UserForm />
          <UserFormRHF />
        </div>
      </div>
    </div>
  );
}

// Create a separate file for the client component
