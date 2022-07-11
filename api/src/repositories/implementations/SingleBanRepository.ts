import Ban from "../../entities/Ban";
import { AppDataSource } from "../../typeorm/data-source";
import { ISingleBanRepository } from "../ISingleBanRepository";

export class SingleBanRepository implements ISingleBanRepository {

  async singleBanFind(nick: string): Promise<Ban | null> {
    const repository = AppDataSource.getRepository(Ban);
    const data = await repository.findOne({
      where: {
        player_nick: nick
      }
    })
    return data;
  }
} 