import { DeleteBanRepository } from "../../repositories/implementations/DeleteBanRepository";
import { SingleBanRepository } from "../../repositories/implementations/SingleBanRepository";
import { DeleteBan } from "./DeleteBan";
import { DeleteBanController } from "./DeleteBanController";

const deleteBanRepository = new DeleteBanRepository();
const singleBanRepository =  new SingleBanRepository();

const deleteBan = new DeleteBan(
  singleBanRepository,
  deleteBanRepository
);

const deleteBanController = new DeleteBanController(
  deleteBan
);

export default deleteBanController;