import { Request, Response, NextFunction } from "express";

const asyncErrorHandle = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next); // pass error to gloabl handler
  };
};
export default asyncErrorHandle;
