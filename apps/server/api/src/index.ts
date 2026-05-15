import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { appRouter } from '../../trpc/src/router'

const app = new Hono()

app.use('*', cors({ origin: 'http://localhost:3000' }))
app.get('/health', (c) => c.json({ status: 'ok' }))
app.all('/trpc/*', (c) =>
  fetchRequestHandler({
    endpoint: '/trpc',
    req: c.req.raw,
    router: appRouter,
    createContext: () => ({ session: null }),
  })
)

export default { port: 3001, fetch: app.fetch }
