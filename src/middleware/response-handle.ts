import { IResponse } from "@interfaces/response";
import logger from "@utils/logger";
import { NextFunction, Request, Response } from "express";
// import SlackLogging from "@configs/log";

export default async (result: any, req: Request, res: Response, next: NextFunction) => {
  let status: number = 200;

  if (result.code === -10) {
    status = 401;
  }

  if (result.code === -11) {
    status = 403;
  }

  if (result.code === -12) {
    status = 400;
  }

  if (result.code === -13) {
    status = 404;
  }

  if (typeof result.code !== "number" && result.code !== 0 && !result.code) {
    status = 500;
    // SlackLogging.send(
    //   "Error from core api: " +
    //     (result.message || result.toString() || "Internal error from core api")
    // ).catch((e) => console.error(e));
    logger.error(result);
  }

  const response: IResponse = {
    code: result.code ?? null,
    message: status === 500 ? "Something went wrong" : result.message,
    data: result.data || null,
  };

  return res.status(status).json(response);
};
