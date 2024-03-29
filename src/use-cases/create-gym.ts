import { GymsRepository } from '@/repositories/gyms-repository'
import { Gym } from '@prisma/client'

interface CreateGymUseCaseRequest {
  title: string
  description?: string | null
  phone: string | null
  latitude: number
  longitude: number
}

interface CreateGymUseCaseResponse {
  gym: Gym
}

export class CreateGymUseCase {
  constructor(private usersRepository: GymsRepository) {}

  async execute({
    latitude,
    longitude,
    phone,
    title,
    description,
  }: CreateGymUseCaseRequest): Promise<CreateGymUseCaseResponse> {
    const gym = await this.usersRepository.create({
      latitude,
      longitude,
      phone,
      title,
      description,
    })

    return { gym }
  }
}
