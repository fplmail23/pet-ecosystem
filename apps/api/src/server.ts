import Fastify from 'fastify'
import cors from '@fastify/cors'
import helmet from '@fastify/helmet'
import rateLimit from '@fastify/rate-limit'
import { healthRoutes } from './routes/health'
import { userRoutes } from './routes/users'
import { petRoutes } from './routes/pets'
import { householdRoutes } from './routes/households'
import { adminRoutes } from './routes/admin'
import { providerRoutes } from './routes/providers'
import { supportRoutes } from './routes/support'

const server = Fastify({
  logger: {
    level: process.env.NODE_ENV === 'production' ? 'warn' : 'info',
    transport: process.env.NODE_ENV !== 'production'
      ? { target: 'pino-pretty', options: { colorize: true } }
      : undefined,
  },
})

server.addContentTypeParser(
  'application/json',
  { parseAs: 'string' },
  function (req, body, done) {
    try {
      ;(req as any).rawBody = body
      done(null, JSON.parse(body as string))
    } catch (err) {
      done(err as Error, undefined)
    }
  }
)

async function buildServer() {
  await server.register(helmet, { contentSecurityPolicy: false })
  await server.register(cors, {
    origin: process.env.CORS_ORIGIN?.split(',') ?? '*',
    credentials: true,
  })
  await server.register(rateLimit, {
    max: 100,
    timeWindow: '1 minute',
  })
  await server.register(healthRoutes, { prefix: '/health' })
  await server.register(userRoutes, { prefix: '/api/v1/users' })
  await server.register(petRoutes, { prefix: '/api/v1/pets' })
  await server.register(householdRoutes, { prefix: '/api/v1/households' })
  await server.register(adminRoutes, { prefix: '/api/v1/admin' })
  await server.register(providerRoutes, { prefix: '/api/v1/providers' })
  await server.register(supportRoutes, { prefix: '/api/v1/support' })
  return server
}

async function start() {
  try {
    const app = await buildServer()
    const port = Number(process.env.PORT) || 3001
    const host = process.env.HOST || '0.0.0.0'
    await app.listen({ port, host })
    console.log(`API corriendo en http://${host}:${port}`)
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

start()
