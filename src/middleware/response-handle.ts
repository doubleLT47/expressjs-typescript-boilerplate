import { IResponse } from "@interfaces/response";
import { NextFunction, Request, Response } from "express";

export default async (result: any, req: Request, res: Response, next: NextFunction) => {
  let status: number = 200;

  if (result.code === -10) {
    status = 401;
  }

  if (result.code === -11) {
    status = 403;
  }

  if (result.code !== 0 ?? !result.code) {
    status = 500;
    console.error(result);
  }

  const response: IResponse = {
    code: status === 200 ? result.code : null,
    message: status === 500 ? "Something went wrong" : result.message,
    data: result.data || null,
  };

  return res.status(status).json(response);
};
