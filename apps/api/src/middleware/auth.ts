import type { FastifyRequest, FastifyReply } from 'fastify'
import { verifyToken } from '@clerk/backend'
import { db, users } from '@pet/db'
import { eq } from 'drizzle-orm'

export async function requireAuth(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authHeader = request.headers.authorization
  if (!authHeader?.startsWith('Bearer ')) {
    return reply.status(401).send({ error: 'Unauthorized', message: 'Token requerido' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const payload = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY!,
    })

    const user = await db.query.users.findFirst({
      where: eq(users.clerkId, payload.sub),
    })

    if (!user) {
      return reply.status(401).send({ error: 'Unauthorized', message: 'Usuario no encontrado' })
    }

    request.user = user
  } catch {
    return reply.status(401).send({ error: 'Unauthorized', message: 'Token inválido' })
  }
}
