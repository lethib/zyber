import path from 'node:path'
import { config } from 'dotenv'
import { defineConfig } from 'prisma/config'

config({ path: path.resolve(__dirname, '../../.env') })

export default defineConfig({
  schema: './db/prisma/schema.prisma',
  migrations: {
    path: './db/prisma/migrations',
    seed: 'bun run db/prisma/seed.ts',
  },
})
