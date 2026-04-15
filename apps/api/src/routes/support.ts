import type { FastifyInstance } from "fastify"
import { db, users, supportCases, supportCaseEvents } from "@pet/db"
import { eq, count, desc } from "drizzle-orm"
import { requireAuth } from "../middleware/auth"
import { nanoid } from "nanoid"

export async function supportRoutes(app: FastifyInstance) {
  app.get("/stats", { preHandler: requireAuth }, async (request, reply) => {
    const [open] = await db.select({ count: count() }).from(supportCases).where(eq(supportCases.status, "OPEN"))
    const [inReview] = await db.select({ count: count() }).from(supportCases).where(eq(supportCases.status, "IN_REVIEW"))
    const [resolved] = await db.select({ count: count() }).from(supportCases).where(eq(supportCases.status, "RESOLVED"))
    return reply.send({ data: { open: open.count, inReview: inReview.count, resolved: resolved.count } })
  })

  app.get("/", { preHandler: requireAuth }, async (request, reply) => {
    const cases = await db
      .select({
        id: supportCases.id,
        category: supportCases.category,
        severity: supportCases.severity,
        status: supportCases.status,
        contextType: supportCases.contextType,
        contextId: supportCases.contextId,
        createdAt: supportCases.createdAt,
        updatedAt: supportCases.updatedAt,
        createdByEmail: users.email,
        createdByFirstName: users.firstName,
        createdByLastName: users.lastName,
      })
      .from(supportCases)
      .leftJoin(users, eq(supportCases.createdByUserId, users.id))
      .orderBy(desc(supportCases.createdAt))
      .limit(100)
    return reply.send({ data: cases })
  })

  app.patch("/:id/status", { preHandler: requireAuth }, async (request, reply) => {
    const { id } = request.params as { id: string }
    const { status } = request.body as { status: string }
    const [updated] = await db.update(supportCases)
      .set({ status: status as any, updatedAt: new Date() })
      .where(eq(supportCases.id, id))
      .returning()
    await db.insert(supportCaseEvents).values({
      id: nanoid(),
      supportCaseId: id,
      eventType: "status_changed",
      payload: JSON.stringify({ status }),
    })
    return reply.send({ data: updated })
  })
}
