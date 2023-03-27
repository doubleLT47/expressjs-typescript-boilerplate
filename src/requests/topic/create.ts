import { HttpStatus } from "./../../constants/http-status";
import createHttpError from "http-errors";
import { ICreateBody } from "./../../interfaces/requests/topic";
import Joi from "joi";
import RBase from "../base";

export class RCreate extends RBase {
  public body(): ICreateBody {
    const schema: Joi.ObjectSchema = Joi.object({
      topic: Joi.string().required(),
      param: Joi.string().required(),
      url: Joi.string().required(),
      type: Joi.string().required(),
    });

    const body: Joi.ValidationResult = schema.validate(this.request.body);
    if (body.error) {
      throw createHttpError(HttpStatus.BAD_REQUEST, {
        errorCode: -1,
        message: body.error.message,
      });
    }
    return body.value;
  }
}
