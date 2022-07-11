import Ban from "../entities/Ban";

export interface ICreateBanRepository {

  findBanByNick(nick: string) : Promise<Ban | null>;

  save(ban: Ban) : Promise<void>;

}