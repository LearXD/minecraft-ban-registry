import { Request, Response } from "express";
import { SingleBanRepository } from "../../repositories/implementations/SingleBanRepository";

export class SingleBanController {
  constructor(
    private singleBan: SingleBanRepository
  ) {
  }

  async handle(request: Request, response: Response): Promise<Response> {

    const ban = await this.singleBan.singleBanFind(request.body.nick)

    if(!ban){
      return response.status(301).json({
        error: "Player not found"
      });
    }   
    return response.status(200).json({
      ban,      
    }); 
  }
}