import joi from "joi"
const addToWishListVal= joi.object({
   product:joi.string().hex().length(24)
})
const removeFromWishList =joi.object({
    product:joi.string().hex().length(24)
})
export{addToWishListVal,removeFromWishList}