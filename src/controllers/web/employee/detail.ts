import { IDetailParams } from "../../../interfaces/requests/web/employee";
import { RDetail } from "./../../../requests/web/employee/detail";
import { NextFunction, Request, Response } from "express";
import { IEmployee } from "../../../interfaces/models/employee";
import { MEmployee } from "../../../models/employee";
export default async (req: Request, res: Response, next: NextFunction) => {
  const request: RDetail = new RDetail({
    params: req.params,
  });
  const params: IDetailParams = request.params();
  const employee: MEmployee | null = await MEmployee.findOne({
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
    where: {
      zalo_uid: params.zalo_id,
      status: 1,
    },
  });

  if (!employee) {
    return next({
      errorCode: 1,
      message: "Not found employee",
    });
  }
  next({
    errorCode: 0,
    message: "success",
    data: {
      ...employee.dataValues,
    },
  });
};
