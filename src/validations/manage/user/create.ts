import Joi from "joi";
import { ICreateBody } from "@interfaces/requests/manage/user";
import RBase from "@validations/base";

export default class RCreate extends RBase {
  public body(): ICreateBody {
    const schema: Joi.ObjectSchema<ICreateBody> = Joi.object({
      lastName: Joi.string().required(),
      firstName: Joi.string().required(),
      middleName: Joi.string().optional(),
      phone: Joi.string().min(10).max(11).required(),
      email: Joi.string().email().required(),
      roleId: Joi.number().required(),
    });

    const body: Joi.ValidationResult<ICreateBody> = schema.validate(this.request.body);
    if (body.error) {
      throw {
        code: -12,
        message: body.error.message,
      };
    }
    return body.value;
  }
}
