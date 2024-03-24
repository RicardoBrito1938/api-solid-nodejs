import { prisma } from '@/lib/prisma'
import { UserRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'

interface RegisterUseCaseProps {
  name: string
  email: string
  password: string
}

// SOLID

// D - Dependency Inversion Principle

export class RegisterUseCase {
  constructor(private usersRepository: UserRepository) {}

  async execute({ email, name, password }: RegisterUseCaseProps) {
    const password_hash = await hash(password, 6)

    const isEmailAlreadyRegistered =
      await this.usersRepository.findByEmail(email)

    if (isEmailAlreadyRegistered) {
      throw new Error('Email already registered')
    }

    await this.usersRepository.create({
      email,
      name,
      password_hash,
    })
  }
}
