import { useNavigate } from '@tanstack/react-router'
import { Badge } from '@/components/ui/badge'
import { THEME_META } from '@/routes/_auth/checklist/components/ThemeAccordion'

const STATUS_CONFIG = {
  NotStarted: { label: 'Non commencé', className: 'text-slate-400 border-slate-300' },
  InProgress:  { label: 'En cours',    className: 'text-amber-500 border-amber-300' },
} as const

interface PlanActionItemProps {
  item: {
    measureId: number
    measureTitle: string
    theme: string
    measureOrder: number
    status: string
  }
  themeSlug: string
}

export function PlanActionItem({ item, themeSlug }: PlanActionItemProps) {
  const navigate = useNavigate()
  const statusCfg = STATUS_CONFIG[item.status as keyof typeof STATUS_CONFIG]
  const themeMeta = THEME_META[item.theme]

  return (
    <div className="flex items-center justify-between px-4 py-3 hover:bg-muted/50">
      <div className="flex flex-col gap-0.5 min-w-0">
        <span className="text-sm font-medium truncate">{item.measureTitle}</span>
        <span className="text-xs text-muted-foreground">{themeMeta?.label}</span>
      </div>
      <div className="flex items-center gap-3 shrink-0 ml-4">
        {statusCfg && (
          <Badge variant="outline" className={statusCfg.className}>
            {statusCfg.label}
          </Badge>
        )}
        <button
          onClick={() =>
            navigate({
              to: '/checklist/$measureId',
              params: { measureId: String(item.measureId) },
              search: { returnTheme: themeSlug },
            })
          }
          className="text-xs text-blue-600 hover:underline whitespace-nowrap"
        >
          Voir le détail
        </button>
      </div>
    </div>
  )
}
