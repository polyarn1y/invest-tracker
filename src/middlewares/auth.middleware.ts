import JwtService from "@/services/jwt.service";
import { Request, Response, NextFunction } from "express";

const jwtService = new JwtService();

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ success: false, message: "No access token provided"})

  req.user = jwtService.verifyAccessToken(token);
  next();
};