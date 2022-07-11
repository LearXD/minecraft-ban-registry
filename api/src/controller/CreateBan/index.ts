import { MySQLBanRepository } from "../../repositories/implementations/MySQLBanRepository";
import { CreateBan } from "./CreateBan"
import { CreateBanController } from "./CreateBanController";

const mySQLBanRepository =  new MySQLBanRepository()

const createBan =  new CreateBan(
  mySQLBanRepository
)

const createBanController = new CreateBanController(createBan)

export default createBanController