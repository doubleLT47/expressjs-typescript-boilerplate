import { IListParams, IListQuery } from "./../../../interfaces/requests/web/time-kepping";
import RBase from "../../base";
import Joi from "joi";
import { CTimeKeepingStatus } from "../../../constants/time-keeping";

export class RList extends RBase {
  public query(): IListQuery {
    const schema: Joi.ObjectSchema<IListQuery> = Joi.object({
      month: Joi.date().default(new Date()),
      status: Joi.string().valid(...Object.values(CTimeKeepingStatus)),
    });

    const query: Joi.ValidationResult<IListQuery> = schema.validate(this.request.query);
    if (query.error) {
      throw {
        errorCode: -1,
        message: query.error.message,
      };
    }

    return query.value;
  }

  public params(): IListParams {
    const schema: Joi.ObjectSchema<IListParams> = Joi.object({
      zalo_id: Joi.string().required(),
    });

    const params: Joi.ValidationResult<IListParams> = schema.validate(this.request.params);
    if (params.error) {
      throw {
        errorCode: -1,
        message: params.error.message,
      };
    }

    return params.value;
  }
}
