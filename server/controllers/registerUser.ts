import { Request, Response } from "express";
import { prisma } from "../prisma/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const userExists = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (userExists) {
    return res
      .status(400)
      .json({ message: "User already exists. Login or try another email" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const userCreated = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });
  if (userCreated && process.env.SECRET) {
    const token = jwt.sign(userCreated, process.env.SECRET, {
      expiresIn: "1h",
    });
    return res
      .status(201)
      .json({
        message: "User has successfully being registered",
        email,
        token,
      });
  }

  return res.status(500);
};
