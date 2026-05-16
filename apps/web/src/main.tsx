import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import { trpc } from './lib/trpc'
import { queryClient } from './lib/query-client'
import { getToken } from './lib/auth'
import { routeTree } from './routeTree.gen'

const router = createRouter({ routeTree })

const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: 'http://localhost:3001/trpc',
      headers: () => {
        const token = getToken()
        return token ? { Authorization: `Bearer ${token}` } : {}
      },
    }),
  ],
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </trpc.Provider>
  </StrictMode>
)
