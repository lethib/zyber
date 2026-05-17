import { trpc } from '@/lib/trpc'
import { Skeleton } from '@/components/ui/skeleton'
import { THEME_META, THEME_ORDER } from '@/routes/_auth/checklist/components/ThemeAccordion'
import { PlanActionItem } from './PlanActionItem'

export function PlanActionList() {
  const { data = [], isLoading } = trpc.planAction.getItems.useQuery()

  if (isLoading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-14 w-full rounded-md" />
        ))}
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center py-16 text-muted-foreground text-sm">
        Plan d&apos;action vide — toutes les mesures sont conformes
      </div>
    )
  }

  const byTheme = THEME_ORDER.reduce<Record<string, typeof data>>((acc, theme) => {
    const items = data.filter(item => item.theme === theme)
    if (items.length > 0) acc[theme] = items
    return acc
  }, {})

  return (
    <div className="space-y-6">
      {THEME_ORDER.filter(theme => byTheme[theme]?.length).map(theme => {
        const meta = THEME_META[theme]
        return (
          <div key={theme}>
            <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 px-1">
              {meta.label}
            </h2>
            <div className="divide-y rounded-md border">
              {byTheme[theme].map(item => (
                <PlanActionItem key={item.measureId} item={item} themeSlug={meta.slug} />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
