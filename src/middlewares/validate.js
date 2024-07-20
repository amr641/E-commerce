import { AppError } from "../../utils/appError.js";

const validate = (schema) => {
  return (req, res, next) => {
    let files = () => {
      if (req.file) {
        let object = { [`${req.file.fieldname}`]: req.file };
        return object;
      }
      if (req.files) {
        let object1 = { images: req.files };
        const objectValues = Object.values(object1);
        for (const value of objectValues) {
          return value;
        }
      }
    };
    const { error } = schema.validate(
      {
        ...req.body,
        ...req.params,
        ...req.query,
        ...files(),
      },
      { abortEarly: false }
    );
    if (!error) return next();
    const errors = error?.details.map((ele) => ele.message);
    next(new AppError(errors, 403));
  };
};
export default validate;
