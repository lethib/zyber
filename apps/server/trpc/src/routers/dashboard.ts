import { MeasureLevel } from '@prisma/client'
import { OrganizationScore } from '@services/organizationScore'
import { z } from 'zod'
import { protectedProcedure, router } from '../trpc'

const levelInput = z.object({ level: z.enum(['standard', 'enhanced']).optional() }).optional()

function toPrismaLevel(level?: 'standard' | 'enhanced'): MeasureLevel | undefined {
  if (level === 'standard') return MeasureLevel.Standard
  if (level === 'enhanced') return MeasureLevel.Enhanced
  return undefined
}

export const dashboardRouter = router({
  getScore: protectedProcedure
    .input(levelInput)
    .query(async ({ ctx, input }) => {
      return await new OrganizationScore(ctx.organizationId).getScore(toPrismaLevel(input?.level))
    }),

  getThemeBreakdown: protectedProcedure
    .input(levelInput)
    .query(async ({ ctx, input }) => {
      return await new OrganizationScore(ctx.organizationId).getThemeBreakdown(toPrismaLevel(input?.level))
    }),
})
