import Joi from "joi";
import { IDisableParams } from "@interfaces/requests/manage/user";
import RBase from "@validations/base";

export default class RDisable extends RBase {
  public params(): IDisableParams {
    const schema: Joi.ObjectSchema<IDisableParams> = Joi.object({
      id: Joi.number().required(),
    });

    const params: Joi.ValidationResult<IDisableParams> = schema.validate(this.request.params);
    if (params.error) {
      throw {
        code: -13,
        message: params.error.message,
      };
    }
    return params.value;
  }
}
