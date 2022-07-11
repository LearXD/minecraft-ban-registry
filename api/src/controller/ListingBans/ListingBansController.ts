import { Request, Response } from "express";
import { IListingBansRepostory } from "../../repositories/IListingBansRepostory";

export class ListingBansController {
  constructor(
    private listingRepository: IListingBansRepostory
  ) {
  }

  async handle(request: Request, response: Response): Promise<Response> {

    try {
      return response.status(201).json({
        listing: ( await this.listingRepository.listingBans())
      })
    } catch {
      return response.status(201).json({
        listing: []
      })
    }
  }
}