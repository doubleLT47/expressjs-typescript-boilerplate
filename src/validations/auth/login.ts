import Joi from "joi";
import RBase from "@validations/base";
import { ILoginBody } from "@interfaces/requests/auth";

export default class RLogin extends RBase {
  public body(): ILoginBody {
    const schema: Joi.ObjectSchema<ILoginBody> = Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required(),
    });

    const body: Joi.ValidationResult<ILoginBody> = schema.validate(this.request.body);
    if (body.error) {
      throw {
        code: -12,
        message: body.error.message,
      };
    }
    return body.value;
  }
}
