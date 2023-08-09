import { IUser } from "@interfaces/models/user";
import {
  ICreateBody,
  IListQuery,
  IUpdateBody,
  IUpdateParams,
} from "@interfaces/requests/manage/user";
import { IUserListResponse } from "@interfaces/responses/user";
import { MRole } from "@models/role";
import { MUser } from "@models/user";
import _ from "lodash";
import { Op, WhereOptions } from "sequelize";
import db from "@dbs/postgres";
import { hashPassword } from "@utils/bcryptjs";
import randomstring from "randomstring";

export default class UserService {
  /**
   *
   * @param query an object has format {search, enable, roleId, page, limit}
   * @returns an object has format { count, users}
   */
  static async list(query: IListQuery): Promise<IUserListResponse> {
    let where: WhereOptions = {};

    if (query.search) {
      where = {
        [Op.or]: [
          db.sequelize.literal(
            `CONCAT("MUser"."last_name", ' ', "MUser"."middle_name",  ' ', "MUser"."first_name") like '%${query.search.trim()}%'`
          ),
          {
            email: {
              [Op.like]: `%${query.search.trim()}%`,
            },
          },
          {
            phone: {
              [Op.like]: `%${query.search.trim()}%`,
            },
          },
        ],
      };
    }

    if (query.enable !== undefined) {
      where = {
        ...where,
        enable: query.enable,
      };
    }

    if (query.roleId) {
      where = {
        ...where,
        roleId: query.roleId,
      };
    }

    const { count, rows } = await MUser.findAndCountAll({
      attributes: {
        exclude: ["password", "profile", "deletedAt"],
      },
      include: [
        {
          model: MRole,
          as: "role",
          attributes: ["name"],
        },
      ],
      where,
      offset: (query.page - 1) * query.limit,
      limit: query.limit,
      raw: true,
      nest: true,
    });

    return {
      count,
      users: rows.map((row: IUser) => ({
        ..._.pick(row, ["lastName", "middleName", "firstName", "phone", "email"]),
        roleName: _.get(row, "role.name"),
      })),
    };
  }

  /**
   *
   * @param id
   * @returns a user
   */
  static async detail(id: number): Promise<Partial<IUser & { roleName: string }>> {
    const user: IUser | null = await MUser.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["password", "deletedAt"],
      },
      include: [
        {
          model: MRole,
          as: "role",
          attributes: ["name"],
        },
      ],
      raw: true,
      nest: true,
    });

    if (!user) {
      throw {
        code: -13,
        message: "user not found",
      };
    }

    return {
      ..._.pick(user, ["lastName", "firstName", "phone", "email"]),
      profile: _.omit(user.profile, "accessToken", "refreshToken", "password"),
      roleName: _.get(user, "role.name"),
    };
  }

  /**
   *
   * @param body an object has format {lastName,firstName,middleName,phone,email,roleId}
   * @returns
   */
  static async create(body: ICreateBody): Promise<number> {
    const user: IUser | null = await MUser.findOne({
      attributes: ["phone", "email"],
      where: {
        [Op.or]: [
          {
            email: body.email,
          },
          {
            phone: body.phone,
          },
        ],
      },
    });

    if (user && user.phone === body.phone) {
      throw {
        code: 1,
        message: "duplicate phone",
      };
    }
    if (user && user.email === body.email) {
      throw {
        code: 2,
        message: "duplicate email",
      };
    }
    return (
      await MUser.create({
        ...body,
        password: hashPassword(
          randomstring.generate({
            length: 8,
          })
        ),
        enable: true,
      })
    ).dataValues.id as number;
  }

  /**
   *
   * @param payload an object has format { lastName,firstName,middleName,phone,email,roleId, id}
   */
  static async update(payload: IUpdateBody & IUpdateParams): Promise<void> {
    const user: IUser | null = await MUser.findOne({
      attributes: ["enable"],
      where: {
        id: payload.id,
      },
    });

    if (!user) {
      throw {
        code: -13,
        message: "user not found",
      };
    }
    await MUser.update(payload, {
      where: {
        id: payload.id,
      },
    });
  }

  /**
   *
   * @param id id of user
   */
  static async disable(id: number): Promise<void> {
    const user: IUser | null = await MUser.findOne({
      attributes: ["enable"],
      where: {
        id: id,
      },
    });

    if (!user) {
      throw {
        code: -13,
        message: "user not found",
      };
    }

    if (!user.enable) {
      throw {
        code: -12,
        message: "user has been disable",
      };
    }

    await MUser.update(
      {
        enable: false,
      },
      {
        where: {
          id,
        },
      }
    );
  }

  /**
   *
   * @param id id of user
   */
  static async enable(id: number): Promise<void> {
    const user: IUser | null = await MUser.findOne({
      attributes: ["enable"],
      where: {
        id: id,
      },
    });

    if (!user) {
      throw {
        code: -13,
        message: "user not found",
      };
    }

    if (user.enable) {
      throw {
        code: -12,
        message: "user has been enable",
      };
    }
    await MUser.update(
      {
        enable: true,
      },
      {
        where: {
          id,
        },
      }
    );
  }

  /**
   *
   * @param id id of user
   */
  static async delete(id: number): Promise<void> {
    await MUser.destroy({
      where: {
        id,
      },
    });
  }
}
