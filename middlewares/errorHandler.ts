import { Request, Response, NextFunction } from "express";
import { AppError, Httpcode } from "../utils/appErrror";

const devErrorHandler = (err: AppError, res: Response) => {
  res.status(Httpcode.INTERNAL_SERVER_ERROR).json({
    name: err.name,
    message: err.message,
    stack: err.stack,
  });
};

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  devErrorHandler(err, res);
};
