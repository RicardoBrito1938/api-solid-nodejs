import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym'

let gymRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymRepository)
  })

  it('should be to register', async () => {
    const { gym } = await sut.execute({
      title: ' Eagles gyms',
      description: null,
      phone: null,
      latitude: 54.165234,
      longitude: -4.4795936,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
