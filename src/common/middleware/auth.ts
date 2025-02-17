import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { env } from "../utils/envConfig";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as {
      id: number;
      isAdmin: boolean;
    };
    req.user = decoded;
    next();
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: "Invalid token." });
  }
};
