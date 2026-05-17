import { useNavigate } from '@tanstack/react-router'
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import { THEME_META } from '@/routes/_auth/checklist/components/ThemeAccordion'

export type Level = 'all' | 'standard' | 'renforce'

export interface ThemeBreakdownItem {
  theme: string
  atteint: number
  total: number
  standardScore: number
  standardAtteint: number
  standardTotal: number
  renforceScore: number
  renforceAtteint: number
  renforceTotal: number
  belowStandard: boolean
}

interface ThemeRadarChartProps {
  data: ThemeBreakdownItem[]
  level: Level
}

const THEME_SHORT_LABELS: Record<string, string> = {
  SensibiliserEtFormer:                'Sensibiliser',
  ConnaitreLeSystemeDInformation:      'Connaître SI',
  AuthentifierEtControlerLesAcces:     'Authentifier',
  SecuriserLesPostes:                  'Postes',
  SecuriserLeReseau:                   'Réseau',
  SecuriserLAdministration:            'Admin.',
  GererLeNomadisme:                    'Nomadisme',
  MaintenirLeSystemeDInformationAJour: 'MAJ SI',
  SuperviserAuditerReagir:             'Superviser',
  PourAllerPlusLoin:                   'Plus loin',
}

const chartConfig = {
  score: {
    label: 'Conformité',
    color: '#16a34a',
  },
} satisfies ChartConfig

const LABEL_LINK = '#0ea5e9'
const LABEL_DEFAULT = '#64748b'

export function ThemeRadarChart({ data, level }: ThemeRadarChartProps) {
  const navigate = useNavigate()

  const chartData = data.map(item => {
    let score: number
    if (level === 'standard') {
      score = item.standardScore
    } else if (level === 'renforce') {
      score = item.renforceScore
    } else {
      score = item.total > 0 ? Math.round((item.atteint / item.total) * 100) : 0
    }
    return { theme: item.theme, score }
  })

  // renderTick: plain function — navigate captured from parent closure (no hooks inside)
  function renderTick(props: Record<string, unknown>) {
    const x = (props.x as number) ?? 0
    const y = (props.y as number) ?? 0
    const textAnchor = (props.textAnchor as 'start' | 'middle' | 'end' | undefined) ?? 'middle'
    const themeKey = (props.payload as { value: string } | undefined)?.value ?? ''
    const meta = THEME_META[themeKey]
    const label = THEME_SHORT_LABELS[themeKey] ?? themeKey

    return (
      <text
        key={themeKey}
        x={x}
        y={y}
        textAnchor={textAnchor}
        dominantBaseline="central"
        fontSize={11}
        fontWeight={meta ? 500 : 400}
        fill={meta ? LABEL_LINK : LABEL_DEFAULT}
        style={{ cursor: meta ? 'pointer' : 'default' }}
        onClick={() => meta && navigate({ to: '/checklist', search: { theme: meta.slug } })}
      >
        {label}
      </text>
    )
  }

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-120"
    >
      <RadarChart data={chartData} margin={{ top: 10, right: 55, bottom: 10, left: 55 }}>
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              formatter={(value) => [`${value}%`, 'Conformité']}
            />
          }
        />
        <PolarAngleAxis dataKey="theme" tick={renderTick} tickLine={false} />
        <PolarGrid stroke="#d4d4d8" strokeWidth={0.75} />
        <Radar
          dataKey="score"
          fill="var(--color-score)"
          fillOpacity={0.18}
          stroke="var(--color-score)"
          strokeWidth={2}
          dot={{ r: 4, fill: '#16a34a', stroke: '#ffffff', strokeWidth: 2, fillOpacity: 1 }}
        />
      </RadarChart>
    </ChartContainer>
  )
}
