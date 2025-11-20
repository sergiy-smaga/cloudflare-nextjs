import Link from "next/link";
import UserProfile from "@/components/UserProfile";
import { getUserById } from "@/lib/user";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function UserProfilePage({ params }: PageProps) {
  const { id } = await params;

  const user = await getUserById(+id);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3>User Profile</h3>
        <Link href="/users" className="btn btn-primary-outline">
          Back to Users
        </Link>
      </div>

      <UserProfile user={user} />
    </div>
  );
}
