import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  experimental: {
    adapter: true,
  },
  engine: "classic",
  datasource: {
    url: "file:./prisma/dev.db",
  },
});
