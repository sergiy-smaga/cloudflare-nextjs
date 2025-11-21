import { getKVList } from "@/lib/kv";

export async function GET() {
  const value = await getKVList();
  return new Response(JSON.stringify(value), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
