import type { FastifyInstance } from 'fastify'
import { db, households, householdMembers } from '@pet/db'
import { eq } from 'drizzle-orm'
import { nanoid } from 'nanoid'
import { requireAuth } from '../middleware/auth'
import { z } from 'zod'

const createHouseholdSchema = z.object({
  name: z.string().min(1).max(100),
})

export async function householdRoutes(app: FastifyInstance) {
  app.get('/', { preHandler: requireAuth }, async (request, reply) => {
    const userHouseholds = await db.query.householdMembers.findMany({
      where: eq(householdMembers.userId, request.user!.id),
      with: {
        household: {
          with: { members: true }
        }
      },
    })
    return reply.send({ data: userHouseholds.map(m => m.household) })
  })

  app.post('/', { preHandler: requireAuth }, async (request, reply) => {
    const body = createHouseholdSchema.parse(request.body)
    const householdId = nanoid()

    const [household] = await db.insert(households).values({
      id: householdId,
      name: body.name,
      ownerUserId: request.user!.id,
    }).returning()

    await db.insert(householdMembers).values({
      id: nanoid(),
      householdId,
      userId: request.user!.id,
      memberRole: 'ADMIN',
      permissions: { view: true, edit: true, book: true, pay: true, admin: true },
    })

    return reply.status(201).send({ data: household })
  })
}
