import { createTRPCReact } from '@trpc/react-query'
import type { AppRouter } from '@zyber/server'

export const trpc = createTRPCReact<AppRouter>()
