
import { catchError } from "../middlewares/catchErrors.js";
import User from "../models/userModel.js";
import showNotFound from "../../utils/notFoundErrors.js";
import bcrypt from 'bcrypt'

// add category
const addUser = catchError(async (req, res) => {

  let user = await User.create(req.body);
  res.status(201).json({ message: "success", user });
});
// all categories
const getAllUsers = catchError(async (req, res) => {
  let users = await User.find().populate('wishList')
  res.status(200).json({ message: "success", users });
});
// get single user
const getUser = catchError(async (req, res, next) => {
  let user = await User.findById(req.params.id);
  user || showNotFound(next, "user");
  !user || res.status(200).json({ message: "success", user });
});
// update user
const updateUser = catchError(async (req, res, next) => {
  let user = await User.findByIdAndUpdate(req.params.id, req.body,{new:true});
  user || showNotFound(next, "user");
  !user || res.status(200).json({ message: "success", user });
});
// delete user
const deleteUser = catchError(async (req, res, next) => {
  let user = await User.findByIdAndDelete(req.params.id);
  user || showNotFound(next, "user");
  !user || res.status(200).json({ message: "success", user });
});
export { addUser, getAllUsers, getUser, updateUser, deleteUser };
