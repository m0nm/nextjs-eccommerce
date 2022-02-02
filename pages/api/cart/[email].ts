import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // connect to db
  await dbConnect();
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
    await dbConnect();
    try {
      const { email } = req.query;
      const { cartItem } = req.body;

      const user = await User.findOne({ email });

      // add a cart to google users
      if (!user.cart) {
        user.cart = [];

        await user.save();
      }

      user.cart.push(cartItem);

      await user.save();

      res.status(200).send({ message: "Cart item saved" + user.cart });
    } catch (error: any) {
      res.status(500).send({ message: "An error occured" + error.message });
      console.log(error.message);
    }
  }
}
