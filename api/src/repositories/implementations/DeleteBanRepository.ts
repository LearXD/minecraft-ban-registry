import Ban from "../../entities/Ban";
import { AppDataSource } from "../../typeorm/data-source";
import { IDeleteBanRepository } from "../IDeleteBanRepository";

export class DeleteBanRepository implements IDeleteBanRepository {

  async delete(nick: string): Promise<void> {
    const repository = AppDataSource.getRepository(Ban)
    repository.delete({
      player_nick: nick
    });
    return;
  }
}