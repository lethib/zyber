import { createFileRoute } from '@tanstack/react-router'
import { trpc } from '../lib/trpc'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  const { data } = trpc.health.ping.useQuery()
  return (
    <div>
      <h1>Zyber</h1>
      {data && <p>pong: {String(data.pong)}</p>}
    </div>
  )
}
