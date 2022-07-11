import { ListingBansRepository } from "../../repositories/implementations/ListingBansRepository";
import { ListingBansController } from "./ListingBansController";

const listingRepository = new ListingBansRepository()

const listingBansController = new ListingBansController(listingRepository)

export default listingBansController 