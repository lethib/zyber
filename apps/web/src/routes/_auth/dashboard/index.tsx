import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { trpc } from '@/lib/trpc'
import { Skeleton } from '@/components/ui/skeleton'
import { Card } from '@/components/ui/card'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { ScoreGauge } from './components/ScoreGauge'
import { ThemeRadarChart, type Level } from './components/ThemeRadarChart'

export const Route = createFileRoute('/_auth/dashboard/')({
  component: DashboardPage,
})

function StatCard({ label, value, accent }: { label: string; value: number; accent?: boolean }) {
  return (
    <Card className="p-4">
      <p className="text-[10px] font-medium uppercase tracking-widest text-zinc-400 mb-2">{label}</p>
      <p className={`text-3xl font-semibold tabular-nums ${accent ? 'text-green-600' : 'text-zinc-700'}`}>
        {value}
      </p>
    </Card>
  )
}

const LEVEL_LABELS: Record<Level, string> = {
  all: 'Tout',
  standard: 'Standard',
  renforce: 'Renforcé',
}

function DashboardPage() {
  const [level, setLevel] = useState<Level>('all')

  const { data: scoreData, isLoading: scoreLoading } = trpc.dashboard.getScore.useQuery()
  const { data: breakdown, isLoading: breakdownLoading } = trpc.dashboard.getThemeBreakdown.useQuery()

  const isLoading = scoreLoading || breakdownLoading

  // Derive gauge values for each level from breakdown aggregates
  const gaugeValues = (() => {
    if (!scoreData || !breakdown) return { score: 0, atteint: 0, total: 0, label: 'mesures atteintes' }

    if (level === 'standard') {
      const atteint = breakdown.reduce((s, t) => s + t.standardAtteint, 0)
      const total = breakdown.reduce((s, t) => s + t.standardTotal, 0)
      const score = total > 0 ? Math.round((atteint / total) * 100) : 0
      return { score, atteint, total, label: 'mesures Standard atteintes' }
    }

    if (level === 'renforce') {
      const atteint = breakdown.reduce((s, t) => s + t.renforceAtteint, 0)
      const total = breakdown.reduce((s, t) => s + t.renforceTotal, 0)
      const score = total > 0 ? Math.round((atteint / total) * 100) : 0
      return { score, atteint, total, label: 'mesures Renforcé atteintes' }
    }

    return {
      score: scoreData.score,
      atteint: scoreData.atteint,
      total: scoreData.total,
      label: 'mesures atteintes',
    }
  })()

  return (
    <div className="min-h-screen bg-zinc-50/60 px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <p className="text-[10px] font-medium uppercase tracking-widest text-zinc-400 mb-2">
          ANSSI — Guide d'hygiène informatique
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">Tableau de bord</h1>
        <p className="text-sm text-zinc-400 mt-1">Suivi de votre conformité en temps réel</p>
      </div>

      {/* Level filter */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-[11px] font-medium uppercase tracking-widest text-zinc-400">
          Niveau
        </span>
        <ToggleGroup
          type="single"
          value={level}
          onValueChange={(v) => { if (v) setLevel(v as Level) }}
          className="gap-0 rounded-md border border-zinc-200 bg-white overflow-hidden"
        >
          {(['all', 'standard', 'renforce'] as Level[]).map((l) => (
            <ToggleGroupItem
              key={l}
              value={l}
              className="rounded-none border-r border-zinc-200 last:border-r-0 px-4 py-1.5 text-xs font-medium data-[state=on]:bg-zinc-900 data-[state=on]:text-white hover:bg-zinc-50 transition-colors h-auto"
            >
              {LEVEL_LABELS[l]}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">

        {/* Left column */}
        <div className="flex flex-col gap-4">

          {/* Score card */}
          <Card className="p-6">
            <p className="text-[10px] font-medium uppercase tracking-widest text-zinc-400 mb-5">
              Score global — {LEVEL_LABELS[level]}
            </p>
            <div className="flex flex-col items-center gap-3">
              {isLoading ? (
                <Skeleton className="h-35 w-35 rounded-full" />
              ) : (
                <ScoreGauge score={gaugeValues.score} />
              )}
              {isLoading ? (
                <Skeleton className="h-4 w-40 rounded" />
              ) : (
                <p className="text-sm text-zinc-500 text-center">
                  <span className="font-semibold text-zinc-900">{gaugeValues.atteint}</span>
                  <span className="mx-1 text-zinc-300">/</span>
                  {gaugeValues.total} {gaugeValues.label}
                </p>
              )}
            </div>
          </Card>

          {/* Mini stat cards */}
          {isLoading ? (
            <div className="grid grid-cols-2 gap-3">
              <Skeleton className="h-22 rounded-lg" />
              <Skeleton className="h-22 rounded-lg" />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <StatCard label="Atteintes" value={gaugeValues.atteint} accent />
              <StatCard label="Restantes" value={gaugeValues.total - gaugeValues.atteint} />
            </div>
          )}

          {/* Progress bar */}
          {!isLoading && gaugeValues.total > 0 && (
            <Card className="p-4">
              <p className="text-[10px] font-medium uppercase tracking-widest text-zinc-400 mb-3">
                Progression
              </p>
              <div className="w-full h-2 rounded-full bg-zinc-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-green-500 transition-all duration-700"
                  style={{ width: `${gaugeValues.score}%` }}
                />
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-[11px] text-zinc-400">0%</span>
                <span className="text-[11px] font-medium text-zinc-600">{gaugeValues.score}%</span>
                <span className="text-[11px] text-zinc-400">100%</span>
              </div>
            </Card>
          )}
        </div>

        {/* Right column: radar */}
        <Card className="lg:col-span-2 p-6">
          <div className="mb-4">
            <p className="text-[10px] font-medium uppercase tracking-widest text-zinc-400 mb-1">
              Conformité par thème — {LEVEL_LABELS[level]}
            </p>
            <p className="text-xs text-zinc-400">
              Cliquer sur un axe pour accéder à la checklist du thème
            </p>
          </div>
          {isLoading || !breakdown ? (
            <Skeleton className="h-105 w-full rounded-md" />
          ) : (
            <ThemeRadarChart data={breakdown} level={level} />
          )}
        </Card>

      </div>
    </div>
  )
}
