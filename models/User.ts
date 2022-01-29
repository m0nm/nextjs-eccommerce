import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minlength: 6,
  },

  cart: [
    {
      name: String,
      price: Number,

      quantity: { type: Number, default: 1 },
    },
  ],
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
