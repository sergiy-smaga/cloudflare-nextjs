import Link from "next/link";

export default function Home() {
  return (
    <div className="flex-center flex-col py-20">
      <h1>Welcome to Stories project</h1>
      <p className="mb-10">
        This is a full-stack application built with NestJS and Next.js. It
        demonstrates user management with MySQL database integration.
      </p>
      <Link href="/users" className="btn btn-primary">
        Manage Users
      </Link>
    </div>
  );
}
