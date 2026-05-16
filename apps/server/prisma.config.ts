import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: './db/prisma/schema.prisma',
  migrations: {
    path: './db/prisma/migrations',
    seed: 'bun run db/prisma/seed.ts',
  },
  datasource: {
    url: env("DATABASE_URL")
  }
})
