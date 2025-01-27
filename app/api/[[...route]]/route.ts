import { Hono } from "hono";
import { handle } from "hono/vercel";

export const runtime = "nodejs";

const app = new Hono().basePath("/api");

// const routes = app.route()
app.get("/hello", (c) => {
	return c.json({ message: "Hello World" });
});

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

// export type AppType = typeof routes;
// export
