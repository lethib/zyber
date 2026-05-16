import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/plan-action')({
  component: PlanActionPage,
})

function PlanActionPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-2xl font-semibold text-zinc-900">Plan d'action</h1>
    </div>
  )
}
