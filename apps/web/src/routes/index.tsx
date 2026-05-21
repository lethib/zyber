import { createFileRoute, redirect } from "@tanstack/react-router";
import { getToken } from "../lib/auth";

export const Route = createFileRoute("/")({
	beforeLoad: () => {
		const token = getToken();
		if (token) throw redirect({ to: "/dashboard" });
		throw redirect({ to: "/login" });
	},
});
