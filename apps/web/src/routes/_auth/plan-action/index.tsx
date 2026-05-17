import { createFileRoute } from '@tanstack/react-router'
import { PlanActionList } from './components/PlanActionList'

export const Route = createFileRoute('/_auth/plan-action/')({
  component: PlanActionPage,
})

function PlanActionPage() {
  return (
    <div className="px-6 py-8">
      <h1 className="text-2xl font-semibold text-zinc-900 mb-6">Plan d&apos;action</h1>
      <PlanActionList />
    </div>
  )
}
