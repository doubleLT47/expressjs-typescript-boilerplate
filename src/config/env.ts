import Joi from "joi";

export const getEnv = (object: any) => {
  const schema: Joi.ObjectSchema = Joi.object({
    MONGODB_HOST: Joi.string().required(),
    MONGODB_PORT: Joi.number().required(),
    MONGODB_USER: Joi.string().required(),
    MONGODB_PWD: Joi.string().required(),
    MONGODB_NAME: Joi.string().required(),
    EMAILS: Joi.string().required(),
    EMAIL_HOST: Joi.string().required(),
    EMAIL_SECRET_KEY: Joi.string().required(),
    SAPOGO_SECRET_KEY: Joi.string().required(),
    ACCESS_TOKEN_READ_ALL: Joi.string().required(),
    TGW_URL: Joi.string().required(),
    X_SAPO_ACCOUNT_ID: Joi.number().required(),
    PORT: Joi.number().required(),
  });

  const env: Joi.ValidationResult = schema.validate(object, {
    allowUnknown: true,
  });
  if (env.error) throw env.error.message;

  return env.value;
};
