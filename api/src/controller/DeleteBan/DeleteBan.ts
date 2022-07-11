import { DeleteResult } from "typeorm";
import { IDeleteBanRepository } from "../../repositories/IDeleteBanRepository";
import { SingleBanRepository } from "../../repositories/implementations/SingleBanRepository"

export class DeleteBan {
  constructor(
    private singleBan: SingleBanRepository,
    private deleteBan: IDeleteBanRepository
  ) {
  }

  async execute(nick: string) {
    const ban = await this.singleBan.singleBanFind(nick);

    if (!ban) {
      throw new Error(`Player not found in database`);
    }

    await this.deleteBan.delete(nick);

    return;
  }
}