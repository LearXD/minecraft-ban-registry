import express from "express";
import routes from "./routes";
import cors from "cors"
import { resolve } from "path";

class App {

  public express: express.Application

  public constructor() {
    this.express = express()
    this.routes(true)
  }

  private routes(cors_activated: boolean): void {
    if (cors_activated)
      this.express.use(cors())
    this.express.use(express.json())
    this.express.use('/head', express.static(resolve(__dirname, '..', 'uploads')))
    this.express.use(routes)
  }

}

export default new App().express