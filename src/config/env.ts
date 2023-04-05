import Joi from "joi";

export const getEnv = (object: any) => {
  const schema: Joi.ObjectSchema = Joi.object({
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().required(),
    DB_USER: Joi.string().required(),
    DB_PWD: Joi.string().required(),
    DB_NAME: Joi.string().required(),
    PORT: Joi.number().required(),
  });

  const env: Joi.ValidationResult = schema.validate(object, {
    allowUnknown: true,
  });
  if (env.error) throw env.error.message;

  return env.value;
};
