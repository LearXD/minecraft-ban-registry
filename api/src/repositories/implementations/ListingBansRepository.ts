import Ban from "../../entities/Ban";
import { AppDataSource } from "../../typeorm/data-source";
import { IListingBansRepostory } from "../IListingBansRepostory";

export class ListingBansRepository implements IListingBansRepostory {

  async listingBans(): Promise<Ban[]> {

    const repository = AppDataSource.getRepository(Ban)
    const data: Ban[] = (await repository.createQueryBuilder('bans').select('*').getRawAndEntities()).raw

    return data;

  }
}