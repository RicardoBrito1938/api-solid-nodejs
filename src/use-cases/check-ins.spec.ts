import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'

import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-ins'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxNumberOfCheckIn } from './errors/max-number-of-check-in'
import { MaxDistanceError } from './errors/max-distance-error'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Get User Profile Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    await gymsRepository.create({
      id: 'gym-id',
      title: 'Gym Name',
      description: '',
      phone: '',
      latitude: 54.165234,
      longitude: -4.4795936,
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-id',
      userId: 'user-id',
      userLatitude: 54.165234,
      userLongitude: -4.4795936,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be to check in twice in the same day', async () => {
    vi.setSystemTime(new Date('2021-01-01T10:00:00'))

    await sut.execute({
      gymId: 'gym-id',
      userId: 'user-id',
      userLatitude: 54.165234,
      userLongitude: -4.4795936,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-id',
        userId: 'user-id',
        userLatitude: 54.165234,
        userLongitude: -4.4795936,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckIn)
  })

  it('should be to check in twice, but in different days', async () => {
    vi.setSystemTime(new Date('2021-01-01T10:00:00'))

    await sut.execute({
      gymId: 'gym-id',
      userId: 'user-id',
      userLatitude: 54.165234,
      userLongitude: -4.4795936,
    })

    vi.setSystemTime(new Date('2021-02-01T10:00:00'))

    const { checkIn } = await sut.execute({
      gymId: 'gym-id',
      userId: 'user-id',
      userLatitude: 54.165234,
      userLongitude: -4.4795936,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in distante from the gym', async () => {
    gymsRepository.items.push({
      id: 'gym-02',
      title: 'Gym Name',
      description: '',
      phone: '',
      latitude: new Decimal(54.1609489),
      longitude: new Decimal(14.52),
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-02',
        userId: 'user-id',
        userLatitude: 0,
        userLongitude: 0,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
