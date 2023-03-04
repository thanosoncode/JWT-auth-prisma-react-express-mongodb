import { Request, Response } from "express";
import { prisma } from "../prisma/prisma";

export const getUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  return res.status(200).json(users);
};
