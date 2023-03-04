import { Request, Response } from "express";
import { prisma } from "../prisma/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return res.status(400).json({ message: "User does not exist" });
  }

  const verified = await bcrypt.compare(password, user.password);

  if (!verified) {
    return res.status(401).json({ message: "Error. User not verified" });
  }

  if (process.env.SECRET) {
    const token = jwt.sign(user, process.env.SECRET, {
      expiresIn: "1h",
    });

    return res
      .status(200)
      .json({ message: "You have successfully logged in", email, token });
  }
  res.json({ message: "Something went terribly wrong" });
};
