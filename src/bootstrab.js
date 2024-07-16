import { globalHandeling } from "./middlewares/globalHandeling.js";
import { AppError } from "../utils/appError.js";
import categoryRouter from "../src/routes/category.routes.js";
import subCategoryRouter from "../src/routes/subCategory.routes.js";
import brandRouter from "../src/routes/brand.routes.js";

const bootstrab = function (app) {
  let baseUrl = "/api/v1";
  app.use(`${baseUrl}/categories`, categoryRouter);
  app.use(`${baseUrl}/subcategories`, subCategoryRouter);
  app.use(`${baseUrl}/brands`, brandRouter);
  app.use("*", (req, res, next) => {
    return next(new AppError("not found", 404));
  });
  app.use(globalHandeling);
};
export default bootstrab;
