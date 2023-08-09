import Joi from "joi";
import { IListQuery } from "@interfaces/requests/manage/user";
import RBase from "@validations/base";

export default class RList extends RBase {
  public query(): IListQuery {
    const schema: Joi.ObjectSchema<IListQuery> = Joi.object({
      search: Joi.string().optional(),
      enable: Joi.boolean().optional(),
      roleId: Joi.number().optional(),
      page: Joi.number().default(1),
      limit: Joi.number().default(10),
    });

    const query: Joi.ValidationResult<IListQuery> = schema.validate(this.request.query);
    if (query.error) {
      throw {
        code: -12,
        message: query.error.message,
      };
    }
    return query.value;
  }
}
