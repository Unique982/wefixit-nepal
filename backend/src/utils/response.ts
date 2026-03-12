// api response helper
import { Response } from "express";
import { STATUS_CODES } from "../constants/statusCodes";
export const sendSuccess = (
  res: Response,
  data: any,
  message = "Success",
  code = STATUS_CODES.OK
) => {
  return res.status(code).json({
    status: "success",
    message,
    data,
  });
};

export const sendError = (
  res: Response,
  message = "Error",
  code = STATUS_CODES.BAD_REQUEST
) => {
  return res.status(code).json({
    status: "fail",
    message,
  });
};
