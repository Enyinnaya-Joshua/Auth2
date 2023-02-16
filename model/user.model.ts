import mongoose, { Document, Schema, model } from "mongoose";

interface userData {
  isAdmin: boolean;
  stack: string;
  fullname: string;
  password: string;
  email: string;
}

interface dataSchema extends userData, Document {}

const userSchema = new Schema({
  fullname: {
    type: String,
    required: [true, "please enter your fullname"],
  },
  stack: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "please enter your email"],
  },
  password: {
    type: String,
    required: [true, "please enter your password"],
    minlength: 6,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const userData = model<dataSchema>("userTest", userSchema);

export default userData;
