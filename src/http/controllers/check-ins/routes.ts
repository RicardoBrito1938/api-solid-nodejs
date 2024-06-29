import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { create } from './create.controller'
import { validate } from './validate.controller'
import { metrics } from './metrics.controller'
import { history } from './history.controller'

export const checkInRoutes = async (app: FastifyInstance) => {
  app.addHook('onRequest', verifyJWT)

  app.get('/check-ins/metrics', metrics)
  app.get('/check-ins/history', history)

  app.post('/gyms/:gymId/check-ins', create)
  app.patch('/check-ins/:checkInId/validate', validate)
}
