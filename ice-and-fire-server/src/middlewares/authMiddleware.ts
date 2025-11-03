import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { HttpStatus } from "../constants/constants";

const JWT_SECRET = process.env.JWT_SECRET || "secret_key";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res
      .status(HttpStatus.UNAUTHORIZED)
      .json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    (req as any).user = decoded;
    next();
  } catch (err: any) {
    if (err.name === "TokenExpiredError") {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: "Token expired" });
    }
    return res
      .status(HttpStatus.UNAUTHORIZED)
      .json({ message: "Invalid token" });
  }
};
