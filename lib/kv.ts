import { getCloudflareContext } from "@opennextjs/cloudflare";

export const getKVValue = async (
  key: string,
  options?: Partial<KVNamespaceGetOptions<"text" | "json">>
) => {
  const { env } = getCloudflareContext();

  const value = await env.KV.get(key, {
    type: "text",
    // cacheTtl: 60,
  });
  return value;
};

export const setKVValue = async (key: string, value: string) => {
  const { env } = getCloudflareContext();

  await env.KV.put(key, value);
  return;
};

export const deleteKVValue = async (key: string) => {
  const { env } = getCloudflareContext();

  await env.KV.delete(key);
  return;
};

export const getKVList = async (options?: {
  prefix?: string;
  limit?: number;
}) => {
  const { env } = getCloudflareContext();

  const list = await env.KV.list(options);
  const keys = list.keys.map((entry) => entry.name);
  const values = await env.KV.get(keys);

  return Object.fromEntries(values);
};
