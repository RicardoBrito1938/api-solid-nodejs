import { makeFetchUserCheckInsHistoryUseCase } from '@/use-cases/factories/make-fetch-user-check-in-history-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const history = async (request: FastifyRequest, reply: FastifyReply) => {
  const historyGymBodySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = historyGymBodySchema.parse(request.query)

  const historyUseCase = makeFetchUserCheckInsHistoryUseCase()

  const { checkIns } = await historyUseCase.execute({
    userId: request.user.sub,
    page,
  })

  return reply.status(200).send({
    checkIns,
  })
}
