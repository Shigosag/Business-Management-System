import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";

export interface AppError extends Error {
  statusCode?: number;
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  logger.error(`${req.method} ${req.originalUrl} - [${statusCode}] ${message}`);

  res.status(statusCode).json({
    status: "error",
    statusCode,
    message: process.env.NODE_ENV === "production" && statusCode === 500
      ? "An unexpected error occurred on the server."
      : message,
  });
};
