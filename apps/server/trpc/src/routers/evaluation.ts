import { EvaluationStatus } from "@prisma/client";
import { EvaluationService } from "@services/evaluation";
import { z } from "zod";
import { protectedProcedure, router } from "../trpc";

export const evaluationRouter = router({
	getByAssessment: protectedProcedure.query(({ ctx }) =>
		new EvaluationService(ctx.organizationId).getItems(),
	),

	updateStatus: protectedProcedure
		.input(
			z.object({
				measureId: z.number().int(),
				status: z.enum(EvaluationStatus),
			}),
		)
		.mutation(({ ctx, input }) =>
			new EvaluationService(ctx.organizationId).updateStatus(input.measureId, input.status),
		),

	updateComment: protectedProcedure
		.input(
			z.object({
				measureId: z.number().int(),
				comment: z.string(),
			}),
		)
		.mutation(({ ctx, input }) =>
			new EvaluationService(ctx.organizationId).updateComment(input.measureId, input.comment),
		),
});
