import { useEffect, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { trpc } from '@/lib/trpc'
import { Skeleton } from '@/components/ui/skeleton'
import { ThemeAccordion } from './components/ThemeAccordion'
import { StatusLegend } from './components/StatusLegend'
import type { EvaluationStatus } from '@zyber/server'

export const Route = createFileRoute('/_auth/checklist/')({
  validateSearch: (search: Record<string, unknown>) => ({
    theme: typeof search.theme === 'string' ? search.theme : undefined,
    scroll: typeof search.scroll === 'number' ? search.scroll : undefined,
  }),
  component: ChecklistPage,
})

function ChecklistPage() {
  const { theme: themeSlug, scroll } = Route.useSearch()
  const navigate = Route.useNavigate()

  const { data: measures, isLoading: measuresLoading } = trpc.measure.getAll.useQuery()
  const { data: assessment, isLoading: assessmentLoading } = trpc.evaluation.getByAssessment.useQuery()

  const isLoading = measuresLoading || assessmentLoading

  const statusMap = new Map<number, EvaluationStatus>(
    assessment?.evaluationItems.map(item => [item.measureId, item.status]) ?? []
  )

  const [openSlugs, setOpenSlugs] = useState<string[]>(themeSlug ? [themeSlug] : [])

  useEffect(() => {
    if (scroll) window.scrollTo(0, scroll)
  }, [])

  useEffect(() => {
    if (themeSlug && !openSlugs.includes(themeSlug)) {
      setOpenSlugs(prev => [...prev, themeSlug])
    }
  }, [themeSlug])

  function handleValueChange(values: string[]) {
    setOpenSlugs(values)
    const lastSlug = values[values.length - 1]
    navigate({
      search: (prev: Record<string, unknown>) => ({ ...prev, theme: lastSlug }),
      replace: true,
    })
  }

  return (
    <div className="px-6 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-zinc-900 mb-4">Checklist ANSSI</h1>
        <StatusLegend />
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} className="h-14 w-full rounded-md" />
          ))}
        </div>
      ) : (
        <ThemeAccordion
          measures={measures ?? []}
          statusMap={statusMap}
          value={openSlugs}
          onValueChange={handleValueChange}
        />
      )}
    </div>
  )
}
