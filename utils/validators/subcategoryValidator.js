import joi from "joi";
const addsubCategoryValidation = joi.object({
  name: joi.string().min(13).required(),
  slug: joi.string(),
  category: joi.string().hex().min(24).required(),
});
const getSubCategoryVal = joi.object({
  id: joi.string().hex().required(),
});
const updateSubCategoryVal = joi.object({
  id: joi.string().hex().required(),

  name: joi.string().min(13),
  slug: joi.string(),
  image: joi.string(),
  category: joi.string().hex(),

  createdBy: joi.string().hex(),
});
const deleteSubCategoryVal = joi.object({
  id: joi.string().hex().required(),
});
export {
  addsubCategoryValidation,
  getSubCategoryVal,
  updateSubCategoryVal,
  deleteSubCategoryVal,
};
