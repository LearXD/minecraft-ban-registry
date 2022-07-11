import { Request, Response } from "express";
import { DeleteBan } from "./DeleteBan";

export class DeleteBanController {

  constructor(
    private deleteBan: DeleteBan
  ) {
  }

  async handle(request: Request, response: Response): Promise<Response> {
    const nick = request.body.nick

    try {

      await this.deleteBan.execute(nick)

      return response.status(200).json({
        sucess: true
      });
    } catch {
      return response.status(303).json({
        sucess: false
      });
    }
  }
}