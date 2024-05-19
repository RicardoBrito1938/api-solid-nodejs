import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'

export const gymsROutes = async (app: FastifyInstance) => {
  app.addHook('onRequest', verifyJWT)
}
