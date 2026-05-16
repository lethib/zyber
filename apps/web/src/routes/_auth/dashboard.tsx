import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { trpc } from '../../lib/trpc'
import { clearToken } from '../../lib/auth'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/_auth/dashboard')({
  component: DashboardPage,
})

function DashboardPage() {
  const navigate = useNavigate()
  const logout = trpc.auth.logout.useMutation({
    onSuccess: () => {
      clearToken()
      navigate({ to: '/login' })
    },
  })

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <h1 className="text-2xl font-semibold text-zinc-900">Dashboard</h1>
      <div className="absolute top-4 right-4">
        <Button variant="outline" onClick={() => logout.mutate()} disabled={logout.isPending}>
          {logout.isPending ? 'Déconnexion...' : 'Se déconnecter'}
        </Button>
      </div>
    </div>
  )
}
