import { IForgotPasswordBody, ILoginBody, INewPasswordBody } from "@interfaces/requests/auth";
import { IRequest } from "@interfaces/requests/request";
import Joi, { ObjectSchema } from "joi";

export const loginSchema: ObjectSchema<IRequest<{}, ILoginBody>> = Joi.object({
  body: Joi.object<ILoginBody>({
    username: Joi.string().required(),
    password: Joi.string().required().min(6),
  }).required(),
});

export const forgotPasswordSchema: ObjectSchema<IRequest<{}, IForgotPasswordBody>> = Joi.object({
  body: Joi.object({
    email: Joi.string().email().required(),
  }).required(),
});

export const newPasswordSchema: ObjectSchema<IRequest<{}, INewPasswordBody>> = Joi.object({
  body: Joi.object({
    email: Joi.string().email().required(),
    code: Joi.string().required(),
    password: Joi.string().required().min(6),
  }).required(),
});
