import Joi from "joi";
import { IUpdateParams, IUpdateBody } from "@interfaces/requests/manage/user";
import RBase from "@validations/base";

export default class RUpdate extends RBase {
  public params(): IUpdateParams {
    const schema: Joi.ObjectSchema<IUpdateParams> = Joi.object({
      id: Joi.number().required(),
    });

    const params: Joi.ValidationResult<IUpdateParams> = schema.validate(this.request.params);
    if (params.error) {
      throw {
        code: -12,
        message: params.error.message,
      };
    }
    return params.value;
  }

  public body(): IUpdateBody {
    const schema: Joi.ObjectSchema<IUpdateBody> = Joi.object({
      lastName: Joi.string().required(),
      firstName: Joi.string().required(),
      middleName: Joi.string().optional(),
      phone: Joi.string().min(10).max(11).required(),
      email: Joi.string().email().required(),
      roleId: Joi.number().required(),
    });

    const body: Joi.ValidationResult<IUpdateBody> = schema.validate(this.request.body);
    if (body.error) {
      throw {
        code: -12,
        message: body.error.message,
      };
    }
    return body.value;
  }
}
