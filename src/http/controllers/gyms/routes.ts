import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { nearby } from './nearby.controller'
import { search } from './search.controller'
import { create } from './create.controller'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'

export const gymsRoutes = async (app: FastifyInstance) => {
  app.addHook('onRequest', verifyJWT)

  app.get('/gyms/nearby', nearby)
  app.get('/gyms/search', search)

  app.post('/gyms', { onRequest: [verifyUserRole('ADMIN')] }, create)
}
