import { getDb } from "@/lib/db";

export async function GET() {
  const db = getDb();
  const value = await db.user.findMany();

  return new Response(JSON.stringify(value), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
