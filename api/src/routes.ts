import { Router } from "express";
import createBanController from "./controller/CreateBan";
import listingBansController from "./controller/ListingBans";
import multer from "multer";
import { multerConfig } from "./config/multer";
import singleBanController from "./controller/SingleBan";
import deleteBanController from "./controller/DeleteBan";

const upload = multer(multerConfig)
const routes = Router();

routes.post('/create-banned', upload.single('file'), async (request, response, skinData) => {
  return await createBanController.handle(request, response);
});

routes.get('/listing-bans', (request, response) => {
  return listingBansController.handle(request, response);
})

routes.get('/singleban', (request, response) => {
  return singleBanController.handle(request, response);
})

routes.delete('/deleteban', (request, response) => {
  return deleteBanController.handle(request, response);
})

export default routes;