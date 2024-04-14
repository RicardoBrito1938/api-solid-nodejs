import { expect, describe, it, beforeEach } from 'vitest'
import { SearchGymUseCase } from './search-gym'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

let inMemoryGymRepository: InMemoryGymsRepository
let sut: SearchGymUseCase

describe('Search gym use case', () => {
  beforeEach(async () => {
    inMemoryGymRepository = new InMemoryGymsRepository()
    sut = new SearchGymUseCase(inMemoryGymRepository)
  })

  it('should be able to fetch check-in history', async () => {
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
      query: 'JS',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms[0].title).toEqual('JS gyms')
  })
})
