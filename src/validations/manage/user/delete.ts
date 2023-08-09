import Joi from "joi";
import { IDeleteParams } from "@interfaces/requests/manage/user";
import RBase from "@validations/base";

export default class RDelete extends RBase {
  public params(): IDeleteParams {
    const schema: Joi.ObjectSchema<IDeleteParams> = Joi.object({
      id: Joi.number().required(),
    });

    const params: Joi.ValidationResult<IDeleteParams> = schema.validate(this.request.params);
    if (params.error) {
      throw {
        code: -13,
        message: params.error.message,
      };
    }
    return params.value;
  }
}
