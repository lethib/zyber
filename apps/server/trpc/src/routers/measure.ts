import { z } from 'zod'
import { MeasureTheme } from '@prisma/client'
import { prisma } from '@db/src/index'
import { protectedProcedure, router } from '../trpc'

export const measureRouter = router({
  getAll: protectedProcedure
    .query(() =>
      prisma.measure.findMany({ orderBy: { order: 'asc' } })
    ),
  getById: protectedProcedure
    .input(z.object({ id: z.number().int() }))
    .query(({ input }) =>
      prisma.measure.findUniqueOrThrow({ where: { id: input.id } })
    ),
  getByTheme: protectedProcedure
    .input(z.object({ theme: z.enum(MeasureTheme) }))
    .query(({ input }) =>
      prisma.measure.findMany({ where: { theme: input.theme }, orderBy: { order: 'asc' } })
    ),
})
