import { IListQuery } from "@interfaces/requests/user";
import { MUser } from "@models/user";
import RList from "@validations/user/list";
import { NextFunction } from "express";
import { Response } from "express";
import { Request } from "express";
import { Op } from "sequelize";
export default async (req: Request, res: Response, next: NextFunction) => {
  const request: RList = new RList({
    query: req.query,
  });

  const query: IListQuery = request.query();

  let where: any = {};

  if (query.search) {
    where = {
      [Op.or]: [
        {
          fullName: {
            [Op.like]: `%${query.search}%`,
          },
        },
        {
          phoneNumber: query.search,
        },
        {
          email: query.search,
        },
        {
          id: String(query.search),
        },
      ],
    };
  }

  const { rows, count } = await MUser.findAndCountAll({
    attributes: {
      exclude: [],
    },
    where,
    raw: true,
    nest: true,
    offset: (query.page - 1) * query.limit,
    limit: query.limit,
    order: [["createdAt", "desc"]],
  });

  return next({
    code: 0,
    message: "success",
    data: {
      count: count,
      page: query.page,
      limit: query.limit,
      users: rows,
    },
  });
};
