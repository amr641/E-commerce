import joi from "joi";
const addProductVal = joi.object({
  title: joi.string().min(2).required(),
  desc: joi.string(),
  price: joi.number(),
  files:joi.object({
    imageCover: joi.array().items(
        joi.object({
          fieldname: joi.string().required(),
          originalname: joi.string().required(),
    
          encoding: joi.string().required(),
          mimetype: joi
            .string()
            .valid("image/jpeg", "image/png", "image/jpg", "image/jif")
            .required(),
    
          size: joi.number().max(5242880).required(),
          destination: joi.string().required(),
    
          filename: joi.string().required(),
          path: joi.string().required(),
        })
      ),
      images: joi.array().items(
          joi.object({
            fieldname: joi.string().required(),
            originalname: joi.string().required(),
      
            encoding: joi.string().required(),
            mimetype: joi
              .string()
              .valid("image/jpeg", "image/png", "image/jpg", "image/jif")
              .required(),
      
            size: joi.number().max(5242880).required(),
            destination: joi.string().required(),
      
            filename: joi.string().required(),
            path: joi.string().required(),
          })
        ),
  }),
  // 
  // 
  category: joi.string().hex().length(24),
  stock:joi.number(),
  subCategory: joi.string().hex().length(24),
  createdBy: joi.string().hex(),
});
const getAllProductsVal = joi.object({
  page: joi.number(),
  limit: joi.number().max(10),
});
const getProductVal = joi.object({
  id: joi.string().hex().required(),
});
const updateProductVal = joi.object({
  id: joi.string().hex().required(),

  title: joi.string().min(5),
  desc: joi.string(),
  price: joi.number(),
  files:joi.object({
    imageCover: joi.array().items(
        joi.object({
          fieldname: joi.string().required(),
          originalname: joi.string().required(),
    
          encoding: joi.string().required(),
          mimetype: joi
            .string()
            .valid("image/jpeg", "image/png", "image/jpg", "image/jif")
            .required(),
    
          size: joi.number().max(5242880).required(),
          destination: joi.string().required(),
    
          filename: joi.string().required(),
          path: joi.string().required(),
        })
      ),
      images: joi.array().items(
          joi.object({
            fieldname: joi.string().required(),
            originalname: joi.string().required(),
      
            encoding: joi.string().required(),
            mimetype: joi
              .string()
              .valid("image/jpeg", "image/png", "image/jpg", "image/jif")
              .required(),
      
            size: joi.number().max(5242880).required(),
            destination: joi.string().required(),
      
            filename: joi.string().required(),
            path: joi.string().required(),
          })
        ),
  }),
  stock:joi.number(),
  category: joi.string().hex().min(24),
  subCategory: joi.string().hex().min(24),
  createdBy: joi.string().hex(),
});
const deleteProductVal = joi.object({
  id: joi.string().hex().length(24).required(),
});
export {
  addProductVal,
  getProductVal,
  updateProductVal,
  deleteProductVal,
  getAllProductsVal,
};
