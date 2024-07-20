export const globalHandeling = (error, req, res, next) => {
  let statusCode = error.status || 500;
  res
    .status(statusCode)
    .json({ message: error.message, status: statusCode, stack: error.stack });
};
