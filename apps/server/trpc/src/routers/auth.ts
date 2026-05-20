import { prisma } from "@db/src/index";
import { UserAuthService } from "@services/auth";
import { TRPCError } from "@trpc/server";
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
			return await new UserAuthService(user).generateJWT();
		}),

	login: publicProcedure
		.input(
			z.object({
				email: z.email(),
				password: z.string().min(1),
			}),
		)
		.mutation(async ({ input }) => {
			const user = await prisma.user.findUnique({
				where: { email: input.email },
			});
			if (!user) throw new TRPCError({ code: "NOT_FOUND" });

			const userAuthentication = new UserAuthService(user);

			await userAuthentication.checkPassword(input.password);
			return await userAuthentication.generateJWT();
		}),

	logout: protectedProcedure.mutation(() => ({ ok: true })),
});
