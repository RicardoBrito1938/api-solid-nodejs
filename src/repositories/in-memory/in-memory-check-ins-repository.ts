import { CheckIn, Prisma } from '@prisma/client'
import { CheckInsRepository } from '../check-ins-repository'
import { randomUUID } from 'crypto'
import dayjs from 'dayjs'

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public items: CheckIn[] = []

  async findById(id: string) {
    return this.items.find((checkIn) => checkIn.id === id) ?? null
  }

  async save(checkIn: CheckIn) {
    const index = this.items.findIndex((item) => item.id === checkIn.id)
    this.items[index] = checkIn

    return checkIn
  }

  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkin: CheckIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      created_at: new Date(),
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
    }

    this.items.push(checkin)

    return checkin
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfDay = dayjs(date).startOf('day')
    const endOfDay = dayjs(date).endOf('day')

    const checkInOnSameDate = this.items.find((checkIn) => {
      const checkInDate = dayjs(checkIn.created_at)
      const isOnSameDate =
        checkInDate.isAfter(startOfDay) && checkInDate.isBefore(endOfDay)

      return checkIn.user_id === userId && isOnSameDate
    })

    if (!checkInOnSameDate) {
      return null
    }

    return checkInOnSameDate
  }

  async findManyByUserId(userId: string, page: number) {
    return this.items
      .filter((checkIn) => checkIn.user_id === userId)
      .slice((page - 1) * 20, page * 20)
  }

  async countByUserId(userId: string) {
    return this.items.filter((checkIn) => checkIn.user_id === userId).length
  }
}
