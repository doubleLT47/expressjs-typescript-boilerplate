import { Request, Response, NextFunction } from "express";
import { IUser } from "@interfaces/models/user";
import { MUser } from "@models/user";
import Joi from "joi";

declare global {
  namespace Express {
    interface Request {
      employee: IUser;
    }
  }
}

export default async (req: Request, res: Response, next: NextFunction) => {
  const validationZaloId: Joi.ValidationResult<string> = Joi.string()
    .required()
    .validate(req.headers.zalo_id);

  if (validationZaloId.error) {
    throw {
      statusCode: 401,
      message: "no zalo_id",
    };
  }
  const zaloId: string = validationZaloId.value;

  const user: IUser | null = await MUser.findOne({
    where: { zalo_uid: zaloId },
    attributes: {
      exclude: [
        "deletedAt",
        "createdAt",
        "updatedAt",
        "status",
        "sapogo_active",
        "basic_salary",
        "basic_number_working_days",
        "other_agreement",
        "bonus_overtime_percent",
        "bonus_holiday_percent",
        "reset_password_token",
        "active_at",
        "password",
      ],
    },
    raw: true,
    nest: true,
  });

  if (!user) {
    throw {
      statusCode: 401,
      message: "Unauthenticated",
    };
  }

  req.employee = user;

  next();
};
