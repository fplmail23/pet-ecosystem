import type { FastifyInstance } from 'fastify'
import { db, users, userRoles } from '@pet/db'
import { eq } from 'drizzle-orm'
import { nanoid } from 'nanoid'
import { requireAuth } from '../middleware/auth'
import { Webhook } from 'svix'

export async function userRoutes(app: FastifyInstance) {
  app.get('/me', { preHandler: requireAuth }, async (request, reply) => {
    return reply.send({ data: request.user })
  })

  app.post('/webhook/clerk', async (request, reply) => {
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET!)

    try {
      const payload = wh.verify(
        JSON.stringify(request.body),
        {
          'svix-id': request.headers['svix-id'] as string,
          'svix-timestamp': request.headers['svix-timestamp'] as string,
          'svix-signature': request.headers['svix-signature'] as string,
        }
      ) as any

      if (payload.type === 'user.created') {
        const { id, email_addresses, first_name, last_name, image_url } = payload.data
        const userId = nanoid()

        await db.insert(users).values({
          id: userId,
          clerkId: id,
          email: email_addresses[0]?.email_address ?? '',
          firstName: first_name ?? null,
          lastName: last_name ?? null,
          avatarUrl: image_url ?? null,
        })

        await db.insert(userRoles).values({
          id: nanoid(),
          userId,
          role: 'PET_OWNER',
        })

        app.log.info(`Usuario creado: ${userId}`)
      }

      return reply.send({ received: true })
    } catch (error) {
      app.log.error('Webhook error:', error)
      return reply.status(400).send({ error: 'Webhook inválido' })
    }
  })
}
