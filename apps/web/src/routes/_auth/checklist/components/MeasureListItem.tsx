import type { Measure, EvaluationStatus } from '@zyber/server'
import { Badge } from '@/components/ui/badge'

const STATUS_CONFIG: Record<EvaluationStatus, { label: string; className: string }> = {
  NotStarted:    { label: 'Non commencé',   className: 'text-slate-400 border-slate-300' },
  InProgress:    { label: 'En cours',       className: 'text-amber-500 border-amber-300' },
  Achieved:      { label: 'Atteint',        className: 'text-green-600 border-green-300' },
  NotApplicable: { label: 'Non applicable', className: 'text-slate-300 border-slate-200 italic' },
}

interface MeasureListItemProps {
  measure: Measure
  status?: EvaluationStatus
}

export function MeasureListItem({ measure, status = 'NotStarted' }: MeasureListItemProps) {
  const { label, className } = STATUS_CONFIG[status]
  return (
    <div className="flex items-center justify-between py-3 px-4 hover:bg-muted/50 cursor-default rounded-sm">
      <span className="text-sm text-foreground">{measure.title}</span>
      <Badge variant="outline" className={`shrink-0 ml-4 ${className}`}>{label}</Badge>
    </div>
  )
}
