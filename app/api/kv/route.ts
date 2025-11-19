import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function GET() {
  const env = getCloudflareContext().env;

  const value = await env.KV.list();
  return new Response(JSON.stringify(value), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
