import { SingleBanRepository } from "../../repositories/implementations/SingleBanRepository";
import { SingleBanController } from "./SingleBanController";

const singleBanRepository = new SingleBanRepository();

const singleBanController =  new SingleBanController(
  singleBanRepository
)

export default singleBanController