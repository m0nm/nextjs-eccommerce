import { NextApiRequest, NextApiResponse } from "next";
import User from "../../../models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // retrieve user cart
  if (req.method === "GET") {
    const { email } = req.query;

    try {
      const user = await User.findOne({ email });

      res.status(200).send({ cart: user.cart });
    } catch (error) {
      res.status(404).send({ message: "Could not find the user cart" });
    }
  }

  // add to cart
  if (req.method === "POST") {
    try {
      const { email } = req.query;
      const { cartItem } = req.body;

      const user = await User.findOne({ email });

      user.cart.push(cartItem);

      await user.save();
      console.log("user cart: ", user.cart);

      res.status(200).send({ message: "Cart item saved" + user.cart });
    } catch (error: any) {
      res.status(500).send({ message: "An error occured" + error.message });
      console.log(error.message);
    }
  }
}
