import { EvaluationStatus, MeasureTheme } from '@prisma/client'
import { prisma } from '@db/src/index'
import { protectedProcedure, router } from '../trpc'

export const dashboardRouter = router({
  getScore: protectedProcedure
    .query(async ({ ctx }) => {
      const assessment = await prisma.assessment.findUnique({
        where: { organizationId: ctx.organizationId },
      })
      if (!assessment) return { score: 0, atteint: 0, total: 42 }

      const [atteint, notApplicable] = await Promise.all([
        prisma.evaluationItem.count({
          where: { assessmentId: assessment.id, status: EvaluationStatus.Achieved },
        }),
        prisma.evaluationItem.count({
          where: { assessmentId: assessment.id, status: EvaluationStatus.NotApplicable },
        }),
      ])

      const total = 42 - notApplicable
      if (total === 0) return { score: 100, atteint: 0, total: 0 }
      return { score: Math.round((atteint / total) * 100), atteint, total }
    }),

  getThemeBreakdown: protectedProcedure
    .query(async ({ ctx }) => {
      const [allMeasures, assessment] = await Promise.all([
        prisma.measure.findMany({ orderBy: { order: 'asc' } }),
        prisma.assessment.findUnique({
          where: { organizationId: ctx.organizationId },
          include: { evaluationItems: true },
        }),
      ])

      const itemByMeasureId = new Map(
        (assessment?.evaluationItems ?? []).map(i => [i.measureId, i])
      )

      function computeScore(measures: typeof allMeasures): number {
        const applicable = measures.filter(m => {
          const item = itemByMeasureId.get(m.id)
          return item?.status !== EvaluationStatus.NotApplicable
        })
        if (applicable.length === 0) return 100
        const achieved = applicable.filter(
          m => itemByMeasureId.get(m.id)?.status === EvaluationStatus.Achieved
        ).length
        return Math.round((achieved / applicable.length) * 100)
      }

      return Object.values(MeasureTheme).map(theme => {
        const themeMeasures = allMeasures.filter(m => m.theme === theme)
        const standardMeasures = themeMeasures.filter(m => m.level === 'Standard')
        const enforcedMeasures = themeMeasures.filter(m => m.level === 'Enhanced')

        const applicable = themeMeasures.filter(
          m => itemByMeasureId.get(m.id)?.status !== EvaluationStatus.NotApplicable
        )
        const atteint = themeMeasures.filter(
          m => itemByMeasureId.get(m.id)?.status === EvaluationStatus.Achieved
        ).length
        const standardScore = computeScore(standardMeasures)

        return {
          theme,
          atteint,
          total: applicable.length,
          standardScore,
          renforceScore: computeScore(enforcedMeasures),
          belowStandard: standardScore < 100,
        }
      })
    }),
})
