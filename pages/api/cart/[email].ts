import { NextApiRequest, NextApiResponse } from "next";
import User from "../../../models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // add to cart
  if (req.method === "POST") {
    try {
      const { email } = req.query;
      const { cartItem } = req.body;

      const user = await User.findOne({ email });

      if (!user.cart) {
        user.cart = [];

        await user.save();
      }

      user.cart.push(cartItem);

      await user.save();
      console.log("user: ", user);

      res.status(200).send({ message: "Cart item saved" + user.cart });
    } catch (error: any) {
      res.status(500).send({ message: "An error occured" + error.message });
      console.log(error.message);
    }
  }
}
