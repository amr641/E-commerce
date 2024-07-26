import joi from 'joi';
// import joiObjectId from "joi-objectid";
// const JoiObjectId = joiObjectId(joi);

const addBrandVal = joi.object({
  name: joi.string().min(13).required(),
  logo: joi
    .object({
      fieldname: joi.string().required(),
      originalname: joi.string().required(),

      encoding: joi.string().required(),
      mimetype: joi
        .string()
        .valid('image/jpeg', 'image/png', 'image/jpg', 'image/jif')
        .required(),

      size: joi.number().max(5242880).required(),
      destination: joi.string().required(),

      filename: joi.string().required(),
      path: joi.string().required(),
    })
    .required(),
  category: joi.string().hex(),
  createdBy: joi.string().hex(),
});
const getBrandVal = joi.object({
  id: joi.string().hex().min(24).required(),
});
const updateBrandVal = joi.object({
  id: joi.string().hex().min(24).required(),

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
