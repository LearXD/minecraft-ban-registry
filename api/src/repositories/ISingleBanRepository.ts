import Ban from "../entities/Ban";

export interface ISingleBanRepository {

  singleBanFind(nick: string) : Promise<Ban | null>;
}