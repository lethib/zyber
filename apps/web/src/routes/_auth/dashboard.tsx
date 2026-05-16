import { createFileRoute } from '@tanstack/react-router'
import { trpc } from '@/lib/trpc'
import { Skeleton } from '@/components/ui/skeleton'
import { ScoreGauge } from '@/features/dashboard/ScoreGauge'

export const Route = createFileRoute('/_auth/dashboard')({
  component: DashboardPage,
})

function DashboardPage() {
  const { data: scoreData, isLoading } = trpc.dashboard.getScore.useQuery()

  return (
    <div className="px-6 py-8">
      <h1 className="text-2xl font-semibold text-zinc-900 mb-6">Dashboard</h1>
      <div className="flex flex-col items-center gap-4">
        {isLoading ? (
          <Skeleton className="h-[140px] w-[140px] rounded-full" />
        ) : (
          <ScoreGauge score={scoreData?.score ?? 0} />
        )}
        {!isLoading && scoreData && (
          <p className="text-sm text-muted-foreground">
            {scoreData.atteint} / {scoreData.total} mesures atteintes
          </p>
        )}
      </div>
    </div>
  )
}
