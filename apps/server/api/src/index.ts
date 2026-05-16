import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { appRouter } from '../../trpc/src/router'
import { createContext } from './auth'

const CORS = {
  'Access-Control-Allow-Origin': 'http://localhost:3000',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

function withCors(res: Response): Response {
  const headers = new Headers(res.headers)
  Object.entries(CORS).forEach(([k, v]) => headers.set(k, v))
  return new Response(res.body, { status: res.status, headers })
}

const trpcHandler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/trpc',
    req,
    router: appRouter,
    createContext: () => createContext(req),
  }).then(withCors)

const server = Bun.serve({
  port: 3001,
  routes: {
    '/health': Response.json({ status: 'ok' }, { headers: CORS }),
    '/trpc/*': {
      OPTIONS: () => new Response(null, { status: 204, headers: CORS }),
      GET: trpcHandler,
      POST: trpcHandler,
    },
  },
  fetch: () => new Response('Not Found', { status: 404 }),
})

console.log(`Server running at ${server.url}`)
