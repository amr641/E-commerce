import joi from 'joi';
const createOrderVal = joi.object({
    cartId:joi.string().hex().length(24),
  user: joi.string().hex().length(24),
  product: joi.string().hex().length(24),
  qty: joi.number(),
  price: joi.number(),
  totalOrderPrice: joi.number(),
  shippingAddress: joi.object({
    city: joi.string(),
    street: joi.string(),
    phone: joi.string(),
  }),
  paymentMethod: joi.string(),
  isPaid: joi.boolean(),
  paidAt: joi.date(),
  isDeliverd: joi.date(),
  DeliverdAt: joi.date(),
});
const getAllOrderOfUserVal= joi.object({
    user:joi.string().hex().length(24)
})
const createCheckoutSessionVal= joi.object({
    cartId:joi.string().hex().length(24).required(),
    shippingAddress: joi.object({
        city: joi.string(),
        street: joi.string(),
        phone: joi.string(),
      }).required(),
})
export {createOrderVal,getAllOrderOfUserVal,createCheckoutSessionVal}