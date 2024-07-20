import joi from "joi";
const addProductVal = joi.object({
  title: joi.string().min(13).required(),
  desc: joi.string(),
  price: joi.number(),
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
  category: joi.string().hex().min(24),
  subCategory: joi.string().hex().min(24),
  createdBy: joi.string().hex(),
});
const getProductVal = joi.object({
  id: joi.string().hex().required(),
});
const updateProductVal = joi.object({
  id: joi.string().hex().required(),

  title: joi.string().min(13),
  slug: joi.string(),
  image: joi.string(),
  createdBy: joi.string().hex(),
});
const deleteProductVal = joi.object({
  id: joi.string().hex().required(),
});
export { addProductVal, getProductVal, updateProductVal, deleteProductVal };
