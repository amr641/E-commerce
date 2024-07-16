export const catchError = function (fn) {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => {
      // res.json({ message: err.message });
      next(err);
    });
  };
};
