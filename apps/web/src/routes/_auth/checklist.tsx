import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/checklist')({
  component: ChecklistPage,
})

function ChecklistPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-2xl font-semibold text-zinc-900">Checklist</h1>
    </div>
  )
}
