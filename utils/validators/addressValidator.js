import joi from "joi"
const addAddressVal= joi.object({
    city:joi.string().required(),
    street:joi.string().required(),
    phoneNumber:joi.string().required(),
})
const removeAddressVal =joi.object({
    address:joi.string().hex().length(24)
})
export{addAddressVal,removeAddressVal}