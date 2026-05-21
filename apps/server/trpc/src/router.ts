import { authRouter } from "./routers/auth";
import { dashboardRouter } from "./routers/dashboard";
import { evaluationRouter } from "./routers/evaluation";
import { healthRouter } from "./routers/health";
import { measureRouter } from "./routers/measure";
import { planActionRouter } from "./routers/plan-action";
import { router } from "./trpc";

export const appRouter = router({
	auth: authRouter,
	health: healthRouter,
	measure: measureRouter,
	evaluation: evaluationRouter,
	dashboard: dashboardRouter,
	planAction: planActionRouter,
});
export type AppRouter = typeof appRouter;
