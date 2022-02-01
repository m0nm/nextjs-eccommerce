import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/dbConnect";
import User from "../../models/User";
import bcrypt from "bcrypt";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  // find user
  const { email, password } = req.body;
  console.log("login req.body: ", req.body);

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404).json({ message: "User does not exist!" });
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    res.status(400).json({ message: "Password is incorrect!" });
    return;
  }

  // return user if login is successful
  res.status(200).send({ user });
}
