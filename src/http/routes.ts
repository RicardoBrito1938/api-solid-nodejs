import { authenticate } from './controllers/authenticate.controller'
import { FastifyInstance } from 'fastify'
import { register } from './controllers/register.controller'

export const appRoutes = async (app: FastifyInstance) => {
  app.post('/users', register)
  app.post('/sessions', authenticate)
}
