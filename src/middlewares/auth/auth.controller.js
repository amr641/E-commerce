import User from '../../models/userModel.js';
import { catchError } from '../catchErrors.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { AppError } from '../../../utils/appError.js';

import showNotFound from '../../../utils/notFoundErrors.js';

const signUp = catchError(async (req, res, next) => {
  let user = await User.create(req.body);
  let token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_KEY
  );
  res.status(201).json({ message: 'success', token });
});

const logIn = catchError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user || !bcrypt.compareSync(req.body.password, user.password))
    return next(new AppError('incorrect email or password', 401));
  let token = jwt.sign(
    { userId: user._id, role: user.role,name:user.name ,email:user.email},
    process.env.JWT_KEY
  );
  res.status(200).json({ message: 'logged in', token });
});
const changeUserPassword = async (req, res, next) => {
  const user = await User.findById(req.user.userId);
  // compare old password with the provided one.
  if (!user || !bcrypt.compareSync(req.body.oldPassword, user.password))
    return next(new AppError('your oldPassword is incorrect', 401));
  // hash the new password
  req.body.newPassword = bcrypt.hashSync(req.body.newPassword, 8);
  // add the changed date
  let token = jwt.sign(
    { userId: user._id, role: user.role,name:user.name },
    process.env.JWT_KEY
  );
  // update and insert it into dataBase
  await User.updateOne(
    { _id: req.user.userId },
    {
      password: req.body.newPassword,
      passwordChangedTime: Date.now(),
    }
  );

  res.status(201).json({ message: 'password changed successfully',token });
};
const protectRoutes = catchError(async (req, res, next) => {

  let user =await  User.findById(req.user.userId)
  if(!user) return showNotFound(next,'user')
  // seconds==>millie seconds ==> Date
  const secondsToDate = seconds => new Date(seconds * 1000);

  if(secondsToDate(req.user.iat)<user?.passwordChangedTime)return next(new AppError('expired toke..login again',409))
  next()

});
const allowedTo=function(...roles){

 return catchError(async(req,res,next)=>{
   if(!roles.includes(req.user.role))
    return next(new AppError('you are not authorized',401))
  next()
    
  })
} 
export { signUp, logIn, changeUserPassword, protectRoutes,allowedTo };
