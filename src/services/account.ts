import { IUser } from "@interfaces/models/user";
import { MRole } from "@models/role";
import { MUser } from "@models/user";
import _ from "lodash";

export default class AccountService {
  /**
   *
   * @param id id of user
   */
  static async profile(id: number): Promise<Partial<IUser & { roleName: string }>> {
    const user: IUser | null = await MUser.findOne({
      attributes: {
        exclude: ["password", "roleId", "createdAt", "updatedAt"],
      },
      include: [
        {
          model: MRole,
          as: "role",
          attributes: ["name"],
        },
      ],
      where: {
        id: id,
      },
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
      ..._.pick(user, ["lastName", "middleName", "firstName", "phone", "email", "id"]),
      profile: _.omit(user.profile, "accessToken", "refreshToken"),
      roleName: _.get(user, "role.name"),
    };
  }
}
