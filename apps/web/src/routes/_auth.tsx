import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { getToken } from '../lib/auth'

export const Route = createFileRoute('/_auth')({
  beforeLoad: () => {
    const token = getToken()
    if (!token) throw redirect({ to: '/login' })
  },
  component: () => <Outlet />,
})
