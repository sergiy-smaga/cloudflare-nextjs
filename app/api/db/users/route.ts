import { getUsers } from "@/lib/user";

export async function GET() {
  const users = await getUsers();

  return new Response(JSON.stringify(users), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
