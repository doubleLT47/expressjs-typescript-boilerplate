import Joi from "joi";
import RBase from "@validations/base";
import { INewPasswordBody } from "@interfaces/requests/auth";

export default class RNewPassword extends RBase {
  public body(): INewPasswordBody {
    const schema: Joi.ObjectSchema<INewPasswordBody> = Joi.object({
      email: Joi.string().required(),
      code: Joi.string().required(),
      password: Joi.string().required(),
    });

    const body: Joi.ValidationResult<INewPasswordBody> = schema.validate(this.request.body);
    if (body.error) {
      throw {
        code: -12,
        message: body.error.message,
      };
    }
    return body.value;
  }
}
