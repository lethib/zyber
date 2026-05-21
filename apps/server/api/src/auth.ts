import { jwtVerify } from "jose";

function getSecret(): Uint8Array {
	const s = process.env.JWT_SECRET;
	if (!s) throw new Error("JWT_SECRET not set");
	return new TextEncoder().encode(s);
}

export async function createContext(req: Request) {
	const auth = req.headers.get("Authorization");
	if (!auth?.startsWith("Bearer ")) return { session: null };
	try {
		const { payload } = await jwtVerify(auth.slice(7), getSecret());
		const userId = payload.userId;
		const organizationId = payload.organizationId;
		if (typeof userId !== "string" || typeof organizationId !== "string") {
			return { session: null };
		}
		return { session: { userId, organizationId } };
	} catch {
		return { session: null };
	}
}
