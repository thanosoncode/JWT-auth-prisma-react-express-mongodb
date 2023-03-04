import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const cookieJwtAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;

  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({ message: "token not found or invalid" });
  }

  if (!jwt.verify(token.split(" ")[1], process.env.SECRET ?? "")) {
    return res.status(401).json({ message: "not verified" });
  }

  next();
};
