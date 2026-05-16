import type { Measure, EvaluationStatus } from '@zyber/server'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Progress } from '@/components/ui/progress'
import { MeasureListItem } from './MeasureListItem'

export const THEME_ORDER = [
  'SensibiliserEtFormer',
  'ConnaitreLeSystemeDInformation',
  'AuthentifierEtControlerLesAcces',
  'SecuriserLesPostes',
  'SecuriserLeReseau',
  'SecuriserLAdministration',
  'GererLeNomadisme',
  'MaintenirLeSystemeDInformationAJour',
  'SuperviserAuditerReagir',
  'PourAllerPlusLoin',
] as const

export const THEME_META: Record<string, { label: string; slug: string }> = {
  SensibiliserEtFormer:               { label: 'Sensibiliser et former',              slug: 'sensibiliser-et-former' },
  ConnaitreLeSystemeDInformation:     { label: 'Connaître le SI',                     slug: 'connaitre-le-si' },
  AuthentifierEtControlerLesAcces:    { label: 'Authentifier et contrôler les accès', slug: 'authentifier-et-controler' },
  SecuriserLesPostes:                 { label: 'Sécuriser les postes',                slug: 'securiser-les-postes' },
  SecuriserLeReseau:                  { label: 'Sécuriser le réseau',                 slug: 'securiser-le-reseau' },
  SecuriserLAdministration:           { label: "Sécuriser l'administration",          slug: 'securiser-ladministration' },
  GererLeNomadisme:                   { label: 'Gérer le nomadisme',                  slug: 'gerer-le-nomadisme' },
  MaintenirLeSystemeDInformationAJour:{ label: 'Maintenir le SI à jour',              slug: 'maintenir-le-si' },
  SuperviserAuditerReagir:            { label: 'Superviser, auditer, réagir',         slug: 'superviser-auditer-reagir' },
  PourAllerPlusLoin:                  { label: 'Pour aller plus loin',                slug: 'pour-aller-plus-loin' },
}

interface ThemeAccordionProps {
  measures: Measure[]
  statusMap: Map<number, EvaluationStatus>
  value: string[]
  onValueChange: (values: string[]) => void
}

export function ThemeAccordion({ measures, statusMap, value, onValueChange }: ThemeAccordionProps) {
  const measuresByTheme = THEME_ORDER.reduce<Record<string, Measure[]>>((acc, theme) => {
    acc[theme] = measures.filter(m => m.theme === theme)
    return acc
  }, {})

  return (
    <Accordion type="multiple" value={value} onValueChange={onValueChange}>
      {THEME_ORDER.map(theme => {
        const meta = THEME_META[theme]
        const themeMs = measuresByTheme[theme] ?? []
        const total = themeMs.length
        const evaluated = themeMs.filter(m => {
          const s = statusMap.get(m.id)
          return s !== undefined && s !== 'NotStarted'
        }).length
        const pct = total > 0 ? (evaluated / total) * 100 : 0

        return (
          <AccordionItem key={theme} value={meta.slug}>
            <AccordionTrigger className="hover:no-underline px-1">
              <div className="flex flex-1 items-center gap-4 mr-2">
                <span className="text-sm font-medium text-left">{meta.label}</span>
                <span className="text-xs text-muted-foreground shrink-0">{evaluated}/{total}</span>
                <Progress value={pct} className="w-24 h-1.5" />
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-0">
              <div className="divide-y divide-border">
                {themeMs.map(m => (
                  <MeasureListItem
                    key={m.id}
                    measure={m}
                    status={statusMap.get(m.id) ?? 'NotStarted'}
                    themeSlug={meta.slug}
                  />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        )
      })}
    </Accordion>
  )
}
