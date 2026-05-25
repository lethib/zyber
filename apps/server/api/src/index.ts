import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "../../trpc/src/router";
import { createContext } from "./auth";

const CORS = {
	"Access-Control-Allow-Origin": "http://localhost:3000",
	"Access-Control-Allow-Methods": "GET, POST, OPTIONS",
	"Access-Control-Allow-Headers": "Content-Type, Authorization",
};

function withCors(res: Response): Response {
	const headers = new Headers(res.headers);
	Object.entries(CORS).forEach(([k, v]) => {
		headers.set(k, v);
	});
	return new Response(res.body, { status: res.status, headers });
}

type Handler = (req: Request) => Response | Promise<Response>;

function withLog(handler: Handler): Handler {
	return async (req: Request) => {
		const start = Date.now();

		let body: unknown;
		if (req.method !== "GET" && req.method !== "OPTIONS") {
			try {
				body = await req.clone().json();
			} catch {
				// not JSON or empty body
			}
		}

		const res = await handler(req);
		const ms = Date.now() - start;
		const path = new URL(req.url).pathname;
		const payload = body !== undefined ? ` ${JSON.stringify(body)}` : "";
		console.log(`${req.method} ${path} ${res.status} (${ms}ms)${payload}`);
		return res;
	};
}

const trpcHandler = withLog((req: Request) =>
	fetchRequestHandler({
		endpoint: "/trpc",
		req,
		router: appRouter,
		createContext: () => createContext(req),
	}).then(withCors),
);

const server = Bun.serve({
	port: 3001,
	routes: {
		"/health": withLog(() => Response.json({ status: "ok" }, { headers: CORS })),
		"/trpc/*": {
			OPTIONS: withLog(() => new Response(null, { status: 204, headers: CORS })),
			GET: trpcHandler,
			POST: trpcHandler,
		},
	},
	fetch: withLog(() => new Response("Not Found", { status: 404 })),
});

console.log(`Server running at ${server.url}`);
