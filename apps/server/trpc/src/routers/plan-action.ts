import { PlanActionService } from "@services/planAction";
import { protectedProcedure, router } from "../trpc";

export const planActionRouter = router({
	getItems: protectedProcedure.query(({ ctx }) =>
		new PlanActionService(ctx.organizationId).getItems(),
	),
});
