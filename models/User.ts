import mongoose from "mongoose";
import { IUser } from "../interface/Index";

const UserSchema = new mongoose.Schema<IUser>({
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
  },
  password: {
    type: String,
    minlength: 6,
    select: false,
  },

  cart: [
    {
      title: String,
      price: Number,
      image: String,
      quantity: { type: Number, default: 1 },
    },
  ],
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
