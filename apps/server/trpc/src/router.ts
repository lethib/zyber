import { router } from './trpc'
import { authRouter } from './routers/auth'
import { healthRouter } from './routers/health'
import { measureRouter } from './routers/measure'
import { evaluationRouter } from './routers/evaluation'
import { dashboardRouter } from './routers/dashboard'
import { planActionRouter } from './routers/plan-action'

export const appRouter = router({
  auth: authRouter,
  health: healthRouter,
  measure: measureRouter,
  evaluation: evaluationRouter,
  dashboard: dashboardRouter,
  planAction: planActionRouter,
})
export type AppRouter = typeof appRouter
