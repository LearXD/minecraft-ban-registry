import Ban from "../entities/Ban";

export interface IListingBansRepostory {

  listingBans() : Promise<Ban[]>
}