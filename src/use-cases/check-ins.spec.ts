import { expect, describe, it, beforeEach } from 'vitest'

import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-ins'

let checkInsUseCase: InMemoryCheckInsRepository
let sut: CheckInUseCase

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    checkInsUseCase = new InMemoryCheckInsRepository()
    sut = new CheckInUseCase(checkInsUseCase)
  })

  it('should be to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-id',
      userId: 'user-id',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
