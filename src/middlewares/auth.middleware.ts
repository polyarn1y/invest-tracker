import JwtService from "@/services/jwt.service";
import ApiError from "@/utils/api-error";
import { Request, Response, NextFunction } from "express";

const jwtService = new JwtService();

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) throw ApiError.unauthorized();

  req.user = jwtService.verifyAccessToken(token);
  next();
};