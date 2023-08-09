import Joi from "joi";
import { IDetailParams } from "@interfaces/requests/manage/user";
import RBase from "@validations/base";

export default class RDetail extends RBase {
  public params(): IDetailParams {
    const schema: Joi.ObjectSchema<IDetailParams> = Joi.object({
      id: Joi.number().required(),
    });

    const params: Joi.ValidationResult<IDetailParams> = schema.validate(this.request.params);
    if (params.error) {
      throw {
        code: -12,
        message: params.error.message,
      };
    }
    return params.value;
  }
}
