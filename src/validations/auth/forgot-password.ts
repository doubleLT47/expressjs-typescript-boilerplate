import Joi from "joi";
import RBase from "@validations/base";
import { IForgotPasswordBody } from "@interfaces/requests/auth";

export default class RForgotPassword extends RBase {
  public body(): IForgotPasswordBody {
    const schema: Joi.ObjectSchema<IForgotPasswordBody> = Joi.object({
      email: Joi.string().required(),
    });

    const body: Joi.ValidationResult<IForgotPasswordBody> = schema.validate(this.request.body);
    if (body.error) {
      throw {
        code: -12,
        message: body.error.message,
      };
    }
    return body.value;
  }
}
