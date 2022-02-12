import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/dbConnect";
import User from "../../models/User";
import bcrypt from "bcrypt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return;
  }

  // connect to db
  await dbConnect();

  const { email, password } = req.body;

  // check if user already exists
  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(422).send({ message: "User already exist!" });
    return;
  }

  // create a new user
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({ email, password: hashedPassword });

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ message: "Could not create a new user, Please try again" });
    }
  }
}
