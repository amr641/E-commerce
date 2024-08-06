import { Schema, Types, model } from 'mongoose';
import { roles } from '../../utils/roles.js';
import bcrypt from 'bcrypt';

const userSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    isBlocked: {
      type: Boolean,
      default: false,
    },
    confirmEmail: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: Object.values(roles),
     
      default: roles.USER,
    },
    passwordChangedTime:{
      type:Date
    },
    wishList:{
      type:[Types.ObjectId],
      ref:'Product'
    },
    addresses:[{
      city:String,
      phoneNumber:String,
      street:String
    }]
  },
  { timestamps: false }
);
userSchema
  .pre('save', function () {
    this.password = bcrypt.hashSync(this.password, 8);
    console.log(this);
  })
  .post('save', function () {
    this.password = bcrypt.hashSync(this.password, 8);
  })
  .pre('findOneAndUpdate', function () {
    if(this._update.password) this._update.password= bcrypt.hashSync(this._update.password, 8);
  });
const User = model('User', userSchema);
export default User;
