import { NextFunction, Request, Response } from "express";
import { CreateBan } from "./CreateBan";
import { Multer } from "multer";

export class CreateBanController {

  constructor(
    private createBan: CreateBan
  ) {
  }

  async handle(request: Request, response: Response): Promise<Response> {        

    const { player_nick, player_xuid, reason, staff_nick, staff_xuid, date, banned } = 
    request.body        
    try {
      await this.createBan.execute({
        player_nick,
        player_xuid,
        reason,
        staff_nick,
        staff_xuid,
        date,
        banned
      })      

      return response.status(201).json({
        sucess: true
      })

    } catch {
      return response.status(400).json({
        sucess: false,
      })
    }
  }
}