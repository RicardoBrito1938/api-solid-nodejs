import { expect, describe, it, beforeEach } from 'vitest'
import { ValidateCheckInUseCase } from './validate-check-in'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'

let inMemoryCheckInsRepository: InMemoryCheckInsRepository
let sut: ValidateCheckInUseCase

describe('Validate check in', () => {
  beforeEach(() => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository()
    sut = new ValidateCheckInUseCase(inMemoryCheckInsRepository)
  })

  it('should be to validate check in', async () => {
    const checkIn = await inMemoryCheckInsRepository.create({
      user_id: 'user_id',
      gym_id: 'gym_id',
    })

    const response = await sut.execute({ checkInId: checkIn.id })

    expect(response.checkIn.validated_at).not.toBe(null)
  })
})
