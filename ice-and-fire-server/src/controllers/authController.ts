import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { users } from "../models/userModel";
import { HttpStatus } from "../constants/constants";

const JWT_SECRET = process.env.JWT_SECRET || "secret_key";

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res
      .status(HttpStatus.BAD_REQUEST)
      .json({ message: "Email and password required" });

  const existing = users.find((u) => u.email === email);
  if (existing)
    return res
      .status(HttpStatus.BAD_REQUEST)
      .json({ message: "User already exists" });

  const passwordHash = await bcrypt.hash(password, 10);
  const newUser = { id: Date.now(), email, passwordHash, favorites: [] };
  users.push(newUser);

  const token = jwt.sign({ id: newUser.id, email: newUser.email }, JWT_SECRET, {
    expiresIn: "1h",
  });

  return res.status(HttpStatus.CREATED).json({
    message: "User registered and logged in",
    token,
    email: newUser.email,
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);

  if (!user)
    return res
      .status(HttpStatus.BAD_REQUEST)
      .json({ message: "Invalid credentials" });

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid)
    return res
      .status(HttpStatus.BAD_REQUEST)
      .json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user.id, email }, JWT_SECRET, {
    expiresIn: "1h",
  });
  return res.json({ message: "Login successful", token });
};
