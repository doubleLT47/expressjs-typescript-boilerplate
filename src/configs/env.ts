import { IEnv } from "@interfaces/env";
import Joi from "joi";

export default (object: any) => {
  const schema: Joi.ObjectSchema<IEnv> = Joi.object({
    // MONGO_ENABLE: Joi.boolean(),
    // MONGO_HOST: Joi.string().required(),
    // MONGO_PORT: Joi.number().required(),
    // MONGO_DATABASE: Joi.string().required(),
    // MONGO_USERNAME: Joi.string().required(),
    // MONGO_PASSWORD: Joi.string().required(),
    PORT: Joi.number().required(),
    SECRET: Joi.string().required(),
    POSTGRES_ENABLE: Joi.boolean(),
    POSTGRES_HOST: Joi.string().required(),
    POSTGRES_PORT: Joi.number().required(),
    POSTGRES_DATABASE: Joi.string().required(),
    POSTGRES_USERNAME: Joi.string().required(),
    POSTGRES_PASSWORD: Joi.string().required(),
    S3_ENABLE: Joi.boolean().required(),
    BUCKET: Joi.string().required(),
    REGION: Joi.string().required(),
    AWS_ACCESS_KEY: Joi.string().required(),
    AWS_SECRET_KEY: Joi.string().required(),
    SLACK_SIGNING_SECRET: Joi.string().required(),
    SLACK_BOT_TOKEN: Joi.string().required(),
    SLACK_CHANNEL: Joi.string().required(),
  });

  const env: Joi.ValidationResult<IEnv> = schema.validate(object, {
    allowUnknown: true,
  });
  if (env.error) throw env.error.message;
};
