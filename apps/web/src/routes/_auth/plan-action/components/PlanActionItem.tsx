import { useNavigate } from '@tanstack/react-router'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import type { EvaluationStatus } from '@zyber/server'
import { Button } from '@/components/ui/button'

const STATUS_CONFIG = {
  NotStarted: {
    label: 'Non commencé',
    dot: 'bg-slate-300',
    badge: 'text-slate-500 bg-zinc-100 border border-zinc-200 hover:bg-amber-50 hover:text-amber-600 hover:border-amber-300',
    nextStatus: 'InProgress' as EvaluationStatus,
    title: 'Marquer En cours',
  },
  InProgress: {
    label: 'En cours',
    dot: 'bg-amber-400',
    badge: 'text-amber-600 bg-amber-50 border border-amber-200 hover:bg-slate-50 hover:text-slate-500 hover:border-slate-200',
    nextStatus: 'NotStarted' as EvaluationStatus,
    title: 'Réinitialiser',
  },
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
  onStatusChange: (measureId: number, status: EvaluationStatus) => void
}

export function PlanActionItem({ item, themeSlug, onStatusChange }: PlanActionItemProps) {
  const navigate = useNavigate()
  const cfg = STATUS_CONFIG[item.status as keyof typeof STATUS_CONFIG]

  return (
    <div className="flex items-center justify-between px-6 py-4 hover:bg-zinc-50/70 transition-colors group">
      {/* Left: title only — theme is shown in the section header above */}
      <span className="text-sm font-medium text-zinc-800 truncate min-w-0 mr-6 leading-snug">
        {item.measureTitle}
      </span>

      {/* Right: status toggle · mark Achieved · detail link */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Clickable status badge — toggles NotStarted ↔ InProgress on click */}
        {cfg && (
          <button
            onClick={() => onStatusChange(item.measureId, cfg.nextStatus)}
            title={cfg.title}
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium transition-all cursor-pointer select-none ${cfg.badge}`}
          >
            <span className={`size-1.5 rounded-full shrink-0 ${cfg.dot}`} />
            {cfg.label}
          </button>
        )}

        {/* Primary action: mark Achieved */}
        <Button
          size="sm"
          variant="outline"
          className="h-7 gap-1.5 rounded-full border-green-200 bg-green-50 px-3 text-xs font-medium text-green-700 hover:bg-green-100 hover:border-green-300 hover:text-green-800 transition-all"
          onClick={() => onStatusChange(item.measureId, 'Achieved')}
        >
          <CheckCircle2 className="size-3.5" />
          Atteint
        </Button>

        {/* Detail navigation — icon button */}
        <button
          onClick={() =>
            navigate({
              to: '/checklist/$measureId',
              params: { measureId: String(item.measureId) },
              search: { returnTheme: themeSlug },
            })
          }
          title="Voir le détail"
          className="flex size-7 items-center justify-center rounded-md text-zinc-300 hover:bg-zinc-100 hover:text-zinc-600 transition-colors"
        >
          <ArrowRight className="size-4" />
        </button>
      </div>
    </div>
  )
}
