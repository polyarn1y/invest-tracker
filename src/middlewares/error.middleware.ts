import ApiError from "@/utils/api-error";
import { Request, Response, NextFunction } from "express";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { ZodError } from "zod";

export const errorMiddleware = (err: Error | ApiError, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ApiError) {
    return res.status(err.status).json({
      success: false,
      message: err.message,
      timestamp: new Date().toISOString(),
    })
  }

  if (err instanceof JsonWebTokenError) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
      timestamp: new Date().toISOString(),
    });
  }

  if (err instanceof TokenExpiredError) {
    return res.status(401).json({
      success: false,
      message: "Token expired",
      timestamp: new Date().toISOString(),
    });
  }

  res.status(500).json({
    success: false,
    error: err,
    message: "Internal server errror",
    timestamp: new Date().toISOString(),

  })
}