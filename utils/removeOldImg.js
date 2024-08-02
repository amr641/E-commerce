import fs from "fs";
import path from "path";
import { AppError } from "./appError.js";
 const removeOldImage = function (product) {
  return(req,res,next)=>{
  let filePath = path.join(
    'uploads',
    'products',
    `${product.imageCover.split('/')[5]}`
  );
      if(!fs.existsSync(filePath))return  next(new AppError('file does not exist', 409));
      fs.unlinkSync(filePath);

  }
};
 const removeOldImages= function(product,imagesLength){
  return (req,res,next)=>{
  for (let i = 0; i < imagesLength; i++) {
   
  }
  }
}
export{removeOldImage,removeOldImages}