import { AppError } from '../../utils/appError.js';

const validate = schema => {
  return (req, res, next) => {
    let files = () =>
      req.files
        ? { files: req.files }
        : { [`${req.file.fieldname}`]: req.file };

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
    const errors = error?.details.map(ele => ele.message);
    next(new AppError(errors, 403));
  };
};
export default validate;
