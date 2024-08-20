import joi from 'joi';
const addToCartVal = joi.object({
  user: joi.string().hex().length(24),
  product: joi.string().hex().length(24),
  qty: joi.number(),
  price: joi.number(),
  totalCartPrice: joi.number(),
  discount: joi.number(),
  totalPriceAfterDiscount: joi.number(),
});
const updateProductQtyVal= joi.object({
    product:joi.string().hex().length(24),
})
const removeProductFromCartVal =joi.object({
    id:joi.string().hex().length(24)
})
const applyCouponVal= joi.object({
    code:joi.string().required()
})
export { addToCartVal,updateProductQtyVal,removeProductFromCartVal,applyCouponVal };
