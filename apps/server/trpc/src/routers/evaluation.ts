import { z } from 'zod'
import { EvaluationStatus } from '@prisma/client'
import { TRPCError } from '@trpc/server'
import { prisma } from '@db/src/index'
import { protectedProcedure, router } from '../trpc'

export const evaluationRouter = router({
  getByAssessment: protectedProcedure
    .query(async ({ ctx }) => {
      const assessment = await prisma.assessment.upsert({
        where: { organizationId: ctx.organizationId },
        create: { organizationId: ctx.organizationId },
        update: {},
      })
      const evaluationItems = await prisma.evaluationItem.findMany({
        where: { assessmentId: assessment.id },
        include: { measure: true },
        orderBy: { measure: { order: 'asc' } },
      })
      return { assessmentId: assessment.id, evaluationItems }
    }),

  updateStatus: protectedProcedure
    .input(z.object({
      measureId: z.number().int(),
      status: z.enum(EvaluationStatus),
    }))
    .mutation(async ({ ctx, input }) => {
      const assessment = await prisma.assessment.findUnique({
        where: { organizationId: ctx.organizationId },
      })
      if (!assessment) {
        throw new TRPCError({ code: 'FORBIDDEN' })
      }
      return prisma.evaluationItem.upsert({
        where: { assessmentId_measureId: { assessmentId: assessment.id, measureId: input.measureId } },
        create: { assessmentId: assessment.id, measureId: input.measureId, status: input.status },
        update: { status: input.status },
      })
    }),
})
