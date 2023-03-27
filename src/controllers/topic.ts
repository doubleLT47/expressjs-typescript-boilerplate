import { ITopic } from "./../interfaces/topic";
import { HttpStatus } from "./../constants/http-status";
import { ICreateBody } from "./../interfaces/requests/topic";
import { RCreate } from "./../requests/topic/create";
import { NextFunction, Request, Response } from "express";
import MTopic from "../models/topic";
import createHttpError from "http-errors";

export const create = async (req: Request, res: Response, next: NextFunction) => {
  const request: RCreate = new RCreate({
    body: req.body,
  });

  const body: ICreateBody = request.body();

  const topic: ITopic | null = await MTopic.findOne({
    topic: body.topic,
  });

  if (topic) {
    return next(
      createHttpError(HttpStatus.BAD_REQUEST, {
        errorCode: 1,
        message: "Topic already exist",
      })
    );
  }

  const newTopic: ITopic = await MTopic.create(body);

  next({
    statusCode: HttpStatus.OK,
    errorCode: 0,
    message: "Success",
    data: newTopic,
  });
};

export const list = async (req: Request, res: Response, next: NextFunction) => {};

export const update = async (req: Request, res: Response, next: NextFunction) => {};

export const remove = async (req: Request, res: Response, next: NextFunction) => {};
