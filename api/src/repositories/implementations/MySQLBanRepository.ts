import Ban from "../../entities/Ban";
import { AppDataSource } from "../../typeorm/data-source";
import { ICreateBanRepository } from "../ICreateBanRepository";

export class MySQLBanRepository implements ICreateBanRepository {

  async findBanByNick(nick: string): Promise<Ban | null> {

    const repository = AppDataSource.getRepository(Ban)

    return await repository.findOneBy({
      player_nick: nick
    })      
  }

  async save(ban: Ban): Promise<void> {
    const repository = AppDataSource.getRepository(Ban)

    await repository.save(ban)
  }
}