import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { getToken } from '../lib/auth'
import { AppSidebar } from '../components/AppSidebar'
import { SidebarProvider, SidebarInset } from '../components/ui/sidebar'

export const Route = createFileRoute('/_auth')({
  beforeLoad: () => {
    const token = getToken()
    if (!token) throw redirect({ to: '/login' })
  },
  component: AuthLayout,
})

function AuthLayout() {
  return (
    <SidebarProvider className="h-screen overflow-hidden">
      <AppSidebar />
      <SidebarInset className="overflow-y-auto">
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  )
}
