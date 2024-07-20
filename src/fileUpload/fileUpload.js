import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import { AppError } from "../../utils/appError.js";

export const fileUpload = (folderName) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `uploads/${folderName}`);
    },
    filename: (req, file, cb) => {
      cb(null, uuidv4() + "-" + file.originalname);
    },
  });
  const fileFilter = (req, file, cb) => {
    const { mimetype } = file;
    if (mimetype.startsWith("image")) return cb(null, true);
    cb(new AppError(`only image allowed`, 403), false);
  };

  const upload = multer({
    fileFilter,
    storage,
    limits: {
      fileSize: 4 * 1024 * 1024,
    },
  });
  return upload;
};
const uploadSingleFile = (folderName, fieldName) =>
  fileUpload(folderName).single(fieldName);
const uploadMixOfFiles = (folderName, fieldName) =>
  fileUpload(folderName).fields(fieldName);
export { uploadMixOfFiles, uploadSingleFile };
