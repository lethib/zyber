import { UserAuthService } from "@services/auth";
import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../trpc";

export const authRouter = router({
	register: publicProcedure
		.input(
			z.object({
				email: z.email(),
				password: z.string().min(8),
			}),
		)
		.mutation(async ({ input }) => {
			const { user } = await UserAuthService.createUserAndOrganization(input.email, input.password);
			return new UserAuthService(user).generateJWT();
		}),

	login: publicProcedure
		.input(
			z.object({
				email: z.email(),
				password: z.string().min(1),
			}),
		)
		.mutation(async ({ input }) => {
			const service = await UserAuthService.findByEmail(input.email);
			await service.checkPassword(input.password);
			return service.generateJWT();
		}),

	logout: protectedProcedure.mutation(() => ({ ok: true })),
});
