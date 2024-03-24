import { prisma } from '@/lib/prisma'
import { PrismaUsersRepository } from '@/repositories/prisma-users-repository'
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

  const prismaUsersRepository = new PrismaUsersRepository()

  await prismaUsersRepository.create({
    email,
    name,
    password_hash,
  })
}
