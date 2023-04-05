import { IDetailParams } from "src/interfaces/requests/web/employee";
import RBase from "../../base";
import Joi from "joi";

export class RDetail extends RBase {
  public params(): IDetailParams {
    const schema: Joi.ObjectSchema<IDetailParams> = Joi.object({
      zalo_id: Joi.string().required(),
    });

    const params: Joi.ValidationResult<IDetailParams> = schema.validate(this.request.params);
    if (params.error) {
      throw {
        errorCode: -2,
        message: params.error.message,
      };
    }
    return params.value;
  }
}
