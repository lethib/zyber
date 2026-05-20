import { QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { httpBatchLink } from "@trpc/client";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { getToken } from "./lib/auth";
import { queryClient } from "./lib/query-client";
import { trpc } from "./lib/trpc";
import { routeTree } from "./routeTree.gen";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

const trpcClient = trpc.createClient({
	links: [
		httpBatchLink({
			url: "http://localhost:3001/trpc",
			headers: () => {
				const token = getToken();
				return token ? { Authorization: `Bearer ${token}` } : {};
			},
		}),
	],
});

// biome-ignore lint/style/noNonNullAssertion: Using any for simplicity
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
			</QueryClientProvider>
		</trpc.Provider>
	</StrictMode>,
);
