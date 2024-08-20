import { globalHandeling } from "./middlewares/globalHandeling.js";
import { AppError } from "../utils/appError.js";
import categoryRouter from "../src/routes/category.routes.js";
import subCategoryRouter from "../src/routes/subCategory.routes.js";
import brandRouter from "../src/routes/brand.routes.js";
import productRouter from "../src/routes/product.routes.js";
import userRouter from "../src/routes/user.routes.js";
import authRoter from "../src/middlewares/auth/auth.routes.js";
import reviewRouter from "../src/routes/review.routes.js";
import wishListRouter from "../src/routes/wishList.routes.js";
import addressRouter from "../src/routes/address.routes.js";
import couponRouter from "../src/routes/coupon.routes.js";
import cartRouter from "../src/routes/cart.routes.js";
import orderRouter from "../src/routes/order.routes.js";

const bootstrab = function (app) {
  let baseUrl = "/api/v1";
  app.use(`${baseUrl}/categories`, categoryRouter);
  app.use(`${baseUrl}/subcategories`, subCategoryRouter);
  app.use(`${baseUrl}/brands`, brandRouter);
  app.use(`${baseUrl}/products`, productRouter);
  app.use(`${baseUrl}/users`, userRouter);
  app.use(`${baseUrl}/auth`, authRoter);
  app.use(`${baseUrl}/reviews`, reviewRouter);
  app.use(`${baseUrl}/wishLists`, wishListRouter);
  app.use(`${baseUrl}/addresses`, addressRouter);
  app.use(`${baseUrl}/coupons`, couponRouter);
  app.use(`${baseUrl}/orders`, orderRouter);
  app.use(`${baseUrl}/carts`, cartRouter);

  app.use("*", (req, res, next) => {
    return next(new AppError("not found", 404));
  });
  app.use(globalHandeling);
};
export default bootstrab;
