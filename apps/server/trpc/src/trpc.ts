import { initTRPC, TRPCError } from "@trpc/server";

export interface Context {
	session: { userId: string; organizationId: string } | null;
}

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
	if (!ctx.session?.organizationId) {
		throw new TRPCError({ code: "UNAUTHORIZED" });
	}
	return next({ ctx: { ...ctx, organizationId: ctx.session.organizationId } });
});
