import { Request, Response, NextFunction } from "express";
import { IEmployee } from "@interfaces/models/employee";
import { MEmployee } from "@models/employee";
import Joi from "joi";

declare global {
  namespace Express {
    interface Request {
      employee: IEmployee;
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

  const user: MEmployee | null = await MEmployee.findOne({
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
  });

  if (!user) {
    throw {
      statusCode: 401,
      message: "Unauthenticated",
    };
  }

  req.employee = user.dataValues;

  next();
};
