import Joi from "joi";
import { IEnableParams } from "@interfaces/requests/manage/user";
import RBase from "@validations/base";

export default class REnable extends RBase {
  public params(): IEnableParams {
    const schema: Joi.ObjectSchema<IEnableParams> = Joi.object({
      id: Joi.number().required(),
    });

    const params: Joi.ValidationResult<IEnableParams> = schema.validate(this.request.params);
    if (params.error) {
      throw {
        code: -13,
        message: params.error.message,
      };
    }
    return params.value;
  }
}
