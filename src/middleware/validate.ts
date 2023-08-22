import { NextFunction, Request, RequestHandler, Response } from "express";
import { ObjectSchema, ValidationResult } from "joi";

export default (schema: ObjectSchema): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    const validationResult: ValidationResult = schema.validate(
      {
        body: req.body,
        query: req.query,
        params: req.params,
      },
      {
        allowUnknown: true,
      }
    );

    if (validationResult.error) {
      return next({
        code: -12,
        message: validationResult.error.message,
      });
    }

    next();
  };
};
