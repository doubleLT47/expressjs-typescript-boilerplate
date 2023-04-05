import { IResponse } from "../interfaces/response";
import { NextFunction, Request, Response } from "express";

export default async (result: any, req: Request, res: Response, next: NextFunction) => {
  const status: number =
    result.statusCode === 401 || result.statusCode === 403
      ? result.statusCode
      : !result.statusCode && result.errorCode === null
      ? 500
      : 200;
  result.errorCode !== 0 && console.log(result);
  const response: IResponse = {
    errorCode: result.errorCode !== undefined ? result.errorCode : null,
    message: result.message || "Something went wrong",
    data: result.data || null,
  };
  res.status(status).json(response);
};
