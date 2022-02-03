import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";
import { ICart } from "../../../interface/Index";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // connect to db
  await dbConnect();
  // find the user
  const { email } = req.query;
  const user = await User.findOne({ email });

  // if user not found
  if (!user) {
    res.status(404).send({ message: "User not found" });
    return;
  }

  // retrieve user cart
  if (req.method === "GET") {
    try {
      res.status(200).send(user.cart);
    } catch (error) {
      console.log("get cart error: ", error);
      res.status(404).send({ message: "Could not find the user cart" });
    }
  }

  // add to cart
  if (req.method === "POST") {
    try {
      const { newCartItem } = req.body;

      // add a cart to google users
      if (!user.cart) {
        user.cart = [];
      }

      // check for duplicates and increment quantity
      for (const cartItem of user.cart) {
        if (cartItem.title === newCartItem.title) {
          cartItem.quantity += 1;

          await user.save();

          res.status(200).send({ message: "Product quantity incremented" });
          return;
        }
      }

      user.cart.push(newCartItem);

      await user.save();

      res.status(200).send({ message: "Cart item saved" + user.cart });
    } catch (error: any) {
      res.status(500).send({ message: "An error occured" + error.message });
      console.log(error.message);
    }
  }

  // delete from cart
  if (req.method === "DELETE") {
    const { item } = req.body;

    try {
      const newCart = user.cart.filter((cartItem: ICart["0"]) => {
        if (cartItem.title !== item.title) {
          return cartItem;
        }
      });

      user.cart = newCart;
      await user.save();

      res.status(200).send({ message: "item deleted successfully" });
    } catch (error: any) {
      console.log("delete cart api: ", error.message);
      res
        .status(500)
        .send({ message: "Could not delete the item " + error.message });
    }
  }
}
