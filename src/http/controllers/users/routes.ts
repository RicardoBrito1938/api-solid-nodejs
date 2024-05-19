import { authenticate } from './authenticate.controller'
import { FastifyInstance } from 'fastify'
import { register } from './register.controller'
import { profile } from './profile.controller'
import { verifyJWT } from '../../middlewares/verify-jwt'

export const usersRoutes = async (app: FastifyInstance) => {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  /* Authenticated */
  app.get(
    '/me',
    {
      onRequest: [verifyJWT],
    },
    profile,
  )
}
