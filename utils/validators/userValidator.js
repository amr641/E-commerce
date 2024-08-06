import joi from 'joi';
const signUpVal= joi.object({
    name:joi.string().min(2).required(),
    email:joi.string().email().required(),
    password:joi.string().max(20).required(),
    role:joi.string()
})
const logInVal= joi.object({

    email:joi.string().email().required(),
    password:joi.string().max(20).required(),

})
export{signUpVal,logInVal}