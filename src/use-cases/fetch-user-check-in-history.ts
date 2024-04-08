import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/check-ins-repository'

interface FetchUserCheckInHistoryCaseRequest {
  userId: string
  page: number
}

interface FetchUserCheckInHistoryCaseResponse {
  checkIns: CheckIn[]
}

export class FetchUserCheckInHistoryCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    page,
  }: FetchUserCheckInHistoryCaseRequest): Promise<FetchUserCheckInHistoryCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
    )

    return { checkIns }
  }
}
