import { Options, diskStorage } from "multer";
import { resolve } from "path";

export const multerConfig = {
  dest: resolve(__dirname, '..', 'uploads'),
  storage: diskStorage({
    destination: resolve(__dirname, '..', '..', 'uploads'),
    filename(req, file, callback) {
      callback(null, file.originalname);
    },
  }),
} as Options;