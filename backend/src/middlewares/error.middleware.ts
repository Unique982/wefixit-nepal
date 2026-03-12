// middleware/error.middleware.ts
import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err); // log error for debugging
  res.status(err.status || 400).json({
    status: "fail",
    message: err.message || "Something went wrong",
  });
};
