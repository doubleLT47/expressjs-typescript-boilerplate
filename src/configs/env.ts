import { IEnv } from "@interfaces/env";
import Joi from "joi";

export const getEnv = (object: any): IEnv => {
  const schema: Joi.ObjectSchema<IEnv> = Joi.object({
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().required(),
    DB_USER: Joi.string().required(),
    DB_PWD: Joi.string().required(),
    DB_NAME: Joi.string().required(),
    PORT: Joi.number().required(),
  });

  const env: Joi.ValidationResult<IEnv> = schema.validate(object, {
    allowUnknown: true,
  });
  if (env.error) throw env.error.message;

  return env.value;
};
