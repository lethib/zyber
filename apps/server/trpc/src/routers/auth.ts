import { TRPCError } from '@trpc/server'
import { SignJWT } from 'jose'
import { Prisma } from '@prisma/client'
import { z } from 'zod'
import { prisma } from '@db/src/index'
import { publicProcedure, protectedProcedure, router } from '../trpc'

export const authRouter = router({
  register: publicProcedure
    .input(z.object({
      email: z.email(),
      password: z.string().min(8),
    }))
    .mutation(async ({ input }) => {
      const passwordHash = await Bun.password.hash(input.password)
      const orgName = input.email.split('@')[1]?.split('.')[0] ?? 'org'

      try {
        const { user } = await prisma.$transaction(async (tx) => {
          const org = await tx.organization.create({ data: { name: orgName } })
          const user = await tx.user.create({
            data: { email: input.email, passwordHash, organizationId: org.id },
          })
          return { user }
        })

        const token = await new SignJWT({ userId: user.id, organizationId: user.organizationId })
          .setProtectedHeader({ alg: 'HS256' })
          .setExpirationTime('7d')
          .sign(new TextEncoder().encode(process.env.JWT_SECRET!))

        return { token }
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
          throw new TRPCError({ code: 'CONFLICT', message: 'EMAIL_TAKEN' })
        }
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' })
      }
    }),

  login: publicProcedure
    .input(z.object({
      email: z.email(),
      password: z.string().min(1),
    }))
    .mutation(async ({ input }) => {
      const user = await prisma.user.findUnique({ where: { email: input.email } })
      if (!user || !(await Bun.password.verify(input.password, user.passwordHash))) {
        throw new TRPCError({ code: 'UNAUTHORIZED', message: 'INVALID_CREDENTIALS' })
      }
      const token = await new SignJWT({ userId: user.id, organizationId: user.organizationId })
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('7d')
        .sign(new TextEncoder().encode(process.env.JWT_SECRET!))
      return { token }
    }),

  logout: protectedProcedure
    .mutation(() => ({ ok: true })),
})
