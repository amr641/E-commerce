import joi from 'joi' ;
const addCouponVal= joi.object({
    code:joi.string(),
    discount:joi.number().required(),
    expireDate:joi.date().required()
})
const updateCouponVal= joi.object({
    id:joi.string().hex().length(24),
    code:joi.string(),
    discount:joi.number(),
    expireDate:joi.date()
})
const deleteCouponVal= joi.object({
    id:joi.string().hex().length(24),
   
})
const getCouponVal= joi.object({
    id:joi.string().hex().length(24),
   
})
export{addCouponVal,updateCouponVal,deleteCouponVal,getCouponVal}