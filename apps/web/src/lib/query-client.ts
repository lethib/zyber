import { QueryCache, QueryClient } from "@tanstack/react-query";
import { TRPCClientError } from "@trpc/client";
import { clearToken } from "./auth";

function handleAuthError(error: unknown) {
	if (error instanceof TRPCClientError && error.data?.code === "UNAUTHORIZED") {
		clearToken();
		window.location.href = "/login";
	}
}

export const queryClient = new QueryClient({
	queryCache: new QueryCache({ onError: handleAuthError }),
});
