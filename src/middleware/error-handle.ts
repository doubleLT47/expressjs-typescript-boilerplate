import { IResponse } from "./../interfaces/response";
import { NextFunction, Request, Response } from "express";

export default async (result: any, req: Request, res: Response, next: NextFunction) => {
  const status: number = result.statusCode || 500;
  const response: IResponse = {
    errorCode: result.errorCode || null,
    message: result.message || "Something went wrong",
    data: result.data || null,
  };
  res.status(status).json(response);
};
