import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { and, eq } from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";
import { db } from "@/db/drizzle";
import { accounts } from "@/db/schema";

const app = new Hono()
	.get("/", clerkMiddleware(), async (c) => {
		const auth = getAuth(c);

		if (!auth?.userId) {
			return c.json({ error: "Unauthorized" }, 401);
		}

		const data = await db
			.select({
				id: accounts.id,
				name: accounts.name,
			})
			.from(accounts)
			.where(eq(accounts.userId, auth.userId));

		console.log("data", data);

		return c.json({ data });
	})
	.get(
		"/:id",
		zValidator(
			"param",
			z.object({
				id: z.string().optional(),
			})
		),
		clerkMiddleware(),
		async (c) => {
			const auth = getAuth(c);
			const { id } = c.req.valid("param");

			if (!id) {
				return c.json({ error: "Missing id" }, 400);
			}

			if (!auth?.userId) {
				return c.json({ error: "Unauthorized" }, 401);
			}

			const [data] = await db
				.select({
					id: accounts.id,
					name: accounts.name,
				})
				.from(accounts)
				.where(
					and(eq(accounts.userId, auth.userId), eq(accounts.id, id))
				);

			if (!data) {
				return c.json({ error: "Not found" }, 404);
			}

			return c.json({ data });
		}
	);

export default app;
