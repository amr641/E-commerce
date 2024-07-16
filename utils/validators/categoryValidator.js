import joi from "joi";
const addCategoryValidation = joi.object({
  name: joi.string().min(13).required(),
  slug: joi.string(),
  image: joi.string(),
  createdBy: joi.string().hex(),
});
const getCategoryVal = joi.object({
  id: joi.string().hex().required(),
});
const updateCategoryVal = joi.object({
  id: joi.string().hex().required(),

  name: joi.string().min(13),
  slug: joi.string(),
  image: joi.string(),
  createdBy: joi.string().hex(),
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
