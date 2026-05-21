import { prisma } from "@db/src";
import type { User } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { TRPCError } from "@trpc/server";
import { SignJWT } from "jose";

export class UserAuthService {
	user: User;

	constructor(user: User) {
		this.user = user;
	}

	static async findByEmail(email: string): Promise<UserAuthService> {
		const user = await prisma.user.findUnique({ where: { email } });
		if (!user) throw new TRPCError({ code: "NOT_FOUND" });
		return new UserAuthService(user);
	}

	static async createUserAndOrganization(email: string, password: string) {
		const passwordHash = await Bun.password.hash(password);
		const orgName = email.split("@")[1]?.split(".")[0] ?? "org";

		try {
			return await prisma.$transaction(async (tx) => {
				const org = await tx.organization.create({ data: { name: orgName } });
				const user = await tx.user.create({
					data: { email: email, passwordHash, organizationId: org.id },
				});
				return { user };
			});
		} catch (e) {
			if (e instanceof PrismaClientKnownRequestError && e.code === "P2002") {
				throw new TRPCError({ code: "CONFLICT", message: "EMAIL_TAKEN" });
			}
			throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
		}
	}

	async generateJWT() {
		if (!Bun.env.JWT_SECRET)
			throw new TRPCError({
				code: "INTERNAL_SERVER_ERROR",
				message: "no_jwt_secret_set",
			});

		return await new SignJWT({
			userId: this.user.id,
			organizationId: this.user.organizationId,
		})
			.setProtectedHeader({ alg: "HS256" })
			.setExpirationTime("7d")
			.sign(new TextEncoder().encode(Bun.env.JWT_SECRET));
	}

	async checkPassword(password: string) {
		if (!(await Bun.password.verify(password, this.user.passwordHash))) {
			throw new TRPCError({ code: "UNAUTHORIZED", message: "INVALID_CREDENTIALS" });
		}
	}
}
