import type { FastifyInstance } from 'fastify'
import { db, pets, petOwnership } from '@pet/db'
import { eq } from 'drizzle-orm'
import { nanoid } from 'nanoid'
import { requireAuth } from '../middleware/auth'
import { z } from 'zod'

const createPetSchema = z.object({
  householdId: z.string(),
  name: z.string().min(1).max(100),
  speciesId: z.string(),
  breedId: z.string().optional(),
  sex: z.enum(['MALE', 'FEMALE', 'UNKNOWN']).default('UNKNOWN'),
  birthDate: z.string().optional(),
  approximateAgeMonths: z.number().optional(),
  primaryColor: z.string().optional(),
  size: z.enum(['TOY', 'SMALL', 'MEDIUM', 'LARGE', 'GIANT']).optional(),
  currentWeightKg: z.string().optional(),
  microchipId: z.string().optional(),
})

export async function petRoutes(app: FastifyInstance) {
  app.get('/', { preHandler: requireAuth }, async (request, reply) => {
    const userPets = await db.query.petOwnership.findMany({
      where: eq(petOwnership.userId, request.user!.id),
      with: { pet: { with: { species: true, breed: true } } },
    })
    return reply.send({ data: userPets.map(o => o.pet) })
  })

  app.get('/:id', { preHandler: requireAuth }, async (request, reply) => {
    const { id } = request.params as { id: string }
    const pet = await db.query.pets.findFirst({
      where: eq(pets.id, id),
      with: { species: true, breed: true, healthConditions: true, documents: true },
    })
    if (!pet) return reply.status(404).send({ error: 'Mascota no encontrada' })
    return reply.send({ data: pet })
  })

  app.post('/', { preHandler: requireAuth }, async (request, reply) => {
    const body = createPetSchema.parse(request.body)
    const petId = nanoid()

    const [pet] = await db.insert(pets).values({
      id: petId,
      ...body,
      birthDate: body.birthDate ? new Date(body.birthDate) : null,
    }).returning()

    await db.insert(petOwnership).values({
      id: nanoid(),
      petId,
      userId: request.user!.id,
      role: 'OWNER',
    })

    return reply.status(201).send({ data: pet })
  })

  app.patch('/:id', { preHandler: requireAuth }, async (request, reply) => {
    const { id } = request.params as { id: string }
    const body = createPetSchema.partial().parse(request.body)

    const [updated] = await db.update(pets)
      .set({ ...body, updatedAt: new Date() })
      .where(eq(pets.id, id))
      .returning()

    return reply.send({ data: updated })
  })
}
