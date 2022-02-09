import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
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
