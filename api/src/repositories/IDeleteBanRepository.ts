export interface IDeleteBanRepository {

  delete(nick: string) : Promise<void>;
}