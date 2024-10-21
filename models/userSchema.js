/* eslint-disable @typescript-eslint/no-unused-vars */
import { Schema, model, models } from "mongoose";


const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Email is Required"],
    unique: [true, "Email Already Exist"],
  },
  email: {
    type: String,
    required: [true, "Username is Required"],
    unique: [true, "Username Already Exist"],
   
  },
  image:{
    type:String,
  }
});

const User= models.User || model('User',userSchema);
export default User;
