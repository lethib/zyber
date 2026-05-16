import { router } from './trpc'
import { authRouter } from './routers/auth'
import { healthRouter } from './routers/health'
import { measureRouter } from './routers/measure'
import { evaluationRouter } from './routers/evaluation'
import { dashboardRouter } from './routers/dashboard'

export const appRouter = router({
  auth: authRouter,
  health: healthRouter,
  measure: measureRouter,
  evaluation: evaluationRouter,
  dashboard: dashboardRouter,
})
export type AppRouter = typeof appRouter
