import joi from "joi";
const addBrandVal = joi.object({
  name: joi.string().min(13).required(),
  slug: joi.string(),
  image: joi.string(),
  category: joi.string().hex(),
  createdBy: joi.string().hex(),
});
const getBrandVal = joi.object({
  id: joi.string().hex().required(),
});
const updateBrandVal = joi.object({
  id: joi.string().hex().required(),

  name: joi.string().min(13),
  slug: joi.string(),
  image: joi.string(),
  category: joi.string().hex(),

  createdBy: joi.string().hex(),
});
const deleteBrandVal = joi.object({
  id: joi.string().hex().required(),
});
export { addBrandVal, getBrandVal, updateBrandVal, deleteBrandVal };
