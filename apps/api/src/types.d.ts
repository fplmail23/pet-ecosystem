import type { InferSelectModel } from 'drizzle-orm'
import type { users } from '@pet/db'

type User = InferSelectModel<typeof users>

declare module 'fastify' {
  interface FastifyRequest {
    user?: User
  }
}
