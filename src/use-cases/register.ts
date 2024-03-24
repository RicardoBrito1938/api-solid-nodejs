import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

interface RegisterUseCaseProps {
  name: string
  email: string
  password: string
}

export const registerUseCase = async ({
  email,
  name,
  password,
}: RegisterUseCaseProps) => {
  const password_hash = await hash(password, 6)

  const isEmailAlreadyRegistered = await prisma.user.findFirst({
    where: {
      email,
    },
  })

  if (isEmailAlreadyRegistered) {
    throw new Error('Email already registered')
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash,
    },
  })
}
