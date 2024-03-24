import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const register = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  const password_hash = await hash(password, 6)

  const isEmailAlreadyRegistered = await prisma.user.findFirst({
    where: {
      email,
    },
  })

  if (isEmailAlreadyRegistered) {
    reply.status(400).send({
      message: 'Email already registered',
    })

    return
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash,
    },
  })

  reply.status(201).send()
}
