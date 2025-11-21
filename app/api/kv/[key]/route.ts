import { getKVValue } from "@/lib/kv";
import type { NextRequest } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  const { key } = await params;

  const value = await getKVValue(key);
  return new Response(JSON.stringify(value), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
