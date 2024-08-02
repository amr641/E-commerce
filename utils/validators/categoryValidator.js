import joi from "joi";
const addCategoryValidation = joi.object({
  name: joi.string().min(2).max(50).required(),
  image: joi
    .object({
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
    .required(),
});
const getCategoryVal = joi.object({
  id: joi.string().hex().required(),
});
const updateCategoryVal = joi.object({
  id: joi.string().hex().required(),

  name: joi.string().min(13),
  slug: joi.string(),
  image: joi
    .object({
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
});
const deleteCategoryVal = joi.object({
  id: joi.string().hex().required(),
});
export {
  addCategoryValidation,
  getCategoryVal,
  updateCategoryVal,
  deleteCategoryVal,
};
