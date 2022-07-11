import Ban from "../../entities/Ban";
import { ICreateBanRepository } from "../../repositories/ICreateBanRepository";

export class CreateBan {

  constructor(
    private banRepository: ICreateBanRepository
  ) {
  }

  async execute(ban: Ban) {
    const exists = await this.banRepository.findBanByNick(ban.player_nick)
    if (exists) {
      throw new Error(`Player already banned`)
    }

    await this.banRepository.save(ban)

  }
}