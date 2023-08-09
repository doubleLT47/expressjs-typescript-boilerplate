import { ILoginBody, INewPasswordBody } from "@interfaces/requests/auth";
import { ILoginResponse, IRefreshTokenResponse } from "@interfaces/responses/auth";
import { MUser } from "@models/user";
import { IUser } from "@interfaces/models/user";
import { Op } from "sequelize";
import _ from "lodash";
import { MRole } from "@models/role";
import { generateRefreshToken, generateToken, verifyToken } from "@utils/jwt";
import { comparePassword, hashPassword } from "@utils/bcryptjs";
import randomString from "randomstring";
import MailService from "@configs/email";
import liquid from "@configs/liquiq";
import moment from "moment";

export interface ITokenPayload {
  userId: number;
  roleId: number;
  createdAt: Date;
}

export default class AuthService {
  /**
   *
   * @param body: { username, password}
   * @returns   return an object has format {user, accessToken, refreshToken}
   */
  static async login(body: ILoginBody): Promise<ILoginResponse> {
    const user: IUser | null = await MUser.findOne({
      attributes: {
        exclude: ["roleId", "createdAt", "updatedAt", "deletedAt"],
      },
      where: {
        [Op.and]: [
          {
            [Op.or]: [
              {
                email: body.username,
              },
              {
                phone: body.username,
              },
            ],
          },
          {
            enable: true,
          },
        ],
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
    if (!user || !comparePassword(body.password, user.password)) {
      throw {
        code: -10,
        message: "wrong credentials",
      };
    }

    const accessToken: string = generateToken({
      userId: user.id as number,
      roleId: user.roleId,
      createdAt: new Date(),
    });
    const refreshToken: string = generateRefreshToken({
      userId: user.id as number,
      roleId: user.roleId,
      createdAt: new Date(),
    });

    await MUser.update(
      {
        profile: {
          ...user.profile,
          accessToken,
          refreshToken,
        },
      },
      {
        where: {
          id: user.id,
        },
      }
    );

    return {
      user: {
        ..._.pick(user, ["lastName", "firstName", "phone", "email"]),
        profile: _.omit(user.profile, "accessToken", "refreshToken", "password"),
        roleName: _.get(user, "role.name"),
      },
      accessToken,
      refreshToken,
    };
  }

  /**
   *
   * @param token
   * @returns return information of user
   */
  static async getUserByToken(token: string): Promise<IUser> {
    const payload: ITokenPayload = await verifyToken(token);
    const user: IUser | null = await MUser.findOne({
      where: {
        id: payload.userId,
      },
      include: [
        {
          model: MRole,
          as: "role",
          attributes: {
            exclude: ["deletedAt"],
          },
        },
      ],
      raw: true,
      nest: true,
    });
    if (!user) {
      throw {
        code: -10,
        message: "unauthenticated",
      };
    }
    if (user.profile.accessToken !== token) {
      this.logout(user);
      throw {
        code: -10,
        message: "unauthenticated",
      };
    }

    return user;
  }

  /**
   *
   * @param refreshToken
   * @returns return an object has format { accessToken }
   */
  static async refreshToken(refreshToken: string): Promise<IRefreshTokenResponse> {
    const payload: ITokenPayload = await verifyToken(refreshToken);
    const user: IUser | null = await MUser.findOne({
      where: {
        id: payload.userId,
      },
      raw: true,
      nest: true,
    });
    if (!user) {
      throw {
        code: -10,
        message: "unauthenticated",
      };
    }
    if (user.profile.accessToken !== refreshToken) {
      this.logout(user);
      throw {
        code: -10,
        message: "unauthenticated",
      };
    }

    return {
      accessToken: generateToken({
        userId: user.id as number,
        roleId: user.roleId,
        createdAt: new Date(),
      }),
    };
  }

  /**
   *
   * @param email
   */
  static async forgotPassword(email: string): Promise<void> {
    const user: IUser | null = await MUser.findOne({
      attributes: ["id", "profile", "lastName", "middleName", "firstName"],
      where: {
        email: email,
        enable: true,
      },
      raw: true,
      nest: true,
    });

    if (!user) {
      throw {
        code: 1,
        message: "user not found",
      };
    }

    const otp: string = randomString.generate({
      charset: "numeric",
      length: 6,
    });

    MailService.send(
      email,
      "Quên mật khẩu Thegioiwhey",
      "OTP quên mật khẩu TGW",
      await liquid.renderFile("email/forgot-password/html.liquid", {
        userName: `${user.lastName} ${user.middleName + " "}${user.firstName}`,
        oneTimePassword: otp,
      })
    ).catch((e) => {
      console.log("🚀 ~ file: auth.ts:215 ~ AuthService ~ forgotPassword ~ e:", e);
    });
    await MUser.update(
      {
        profile: {
          ...user.profile,
          password: {
            code: otp,
            createdAt: new Date(),
          },
        },
      },
      {
        where: {
          id: user.id,
        },
      }
    );
  }

  /**
   *
   * @param payload { code, email, password}
   */
  static async newPassWord(payload: INewPasswordBody): Promise<void> {
    const user: IUser | null = await MUser.findOne({
      attributes: ["profile", "id"],
      where: {
        email: payload.email,
      },
      raw: true,
      nest: true,
    });

    if (!user) {
      throw {
        code: -12,
        message: "user not found",
      };
    }

    if (
      user.profile.password.code !== payload.code ||
      moment().subtract(5, "minute").valueOf() > moment(user.profile.password.createdAt).valueOf()
    ) {
      throw {
        code: 1,
        message: "wrong otp",
      };
    }
    await MUser.update(
      {
        password: hashPassword(payload.password),
        profile: {
          ...user.profile,
          password: {
            code: null,
            createdAt: null,
          },
        },
      },
      {
        where: {
          id: user.id,
        },
      }
    );
  }

  /**
   *
   * @param user IUser
   */
  static async logout(user: IUser): Promise<void> {
    await MUser.update(
      {
        profile: {
          ...user.profile,
          accessToken: null,
          refreshToken: null,
        },
      },
      {
        where: {
          id: user.id,
        },
      }
    );
  }
}
