import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let inMemoryGymRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby gym use case', () => {
  beforeEach(async () => {
    inMemoryGymRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(inMemoryGymRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await inMemoryGymRepository.create({
      title: 'JS gyms',
      description: null,
      phone: null,
      latitude: 54.165234,
      longitude: -4.4795936,
    })

    await inMemoryGymRepository.create({
      title: 'TS gyms',
      description: null,
      phone: null,
      latitude: 54.165234,
      longitude: -4.4795936,
    })

    const { gyms } = await sut.execute({
      userLatitude: 54.165234,
      userLongitude: -4.4795936,
    })

    expect(gyms).toHaveLength(2)
  })
})
