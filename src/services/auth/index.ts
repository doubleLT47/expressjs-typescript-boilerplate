import bcryptjs from "bcryptjs";
import { ILoginBody, INewPasswordBody } from "@interfaces/requests/auth";
import { ILoginResponse, IRefreshTokenResponse } from "@interfaces/responses/auth";
import jwt, { JwtPayload } from "jsonwebtoken";
import configs from "@configs/index";
import { MUser } from "@models/user";
import { IUser } from "@interfaces/models/user";
import { Op } from "sequelize";
import _ from "lodash";
import { MRole } from "@models/role";

export interface ITokenPayload {
  userId: number;
  roleId: number;
  createdAt: Date;
}
export interface IRefreshToken {}
class AuthService {
  /**
   *
   * @param body: { username, password}
   * @returns   return a object has format {user, accessToken, refreshToken}
   */
  async login(body: ILoginBody): Promise<ILoginResponse> {
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
    if (!user || !this.comparePassword(body.password, user.password)) {
      throw {
        code: -10,
        message: "wrong credentials",
      };
    }

    const accessToken: string = this.generateToken({
      userId: user.id as number,
      roleId: user.roleId,
      createdAt: new Date(),
    });
    const refreshToken: string = this.generateRefreshToken({
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
  async getUserByToken(token: string): Promise<IUser> {
    const payload: ITokenPayload = await this.verifyToken(token);
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
   * @returns return a object has format { accessToken }
   */
  async refreshToken(refreshToken: string): Promise<IRefreshTokenResponse> {
    const payload: ITokenPayload = await this.verifyToken(refreshToken);
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
      accessToken: this.generateToken({
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
  async forgotPassword(email: string): Promise<void> {}

  /**
   *
   * @param params { code, email, password}
   */
  async newPassWord(params: INewPasswordBody): Promise<void> {}

  /**
   *
   * @param user IUser
   */
  async logout(user: IUser): Promise<void> {
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

  /**
   *
   * @param payload { userId, roleId, createdAt}
   * @returns return a jwt token
   */
  private generateToken(payload: ITokenPayload): string {
    return jwt.sign(payload, configs.app.secret, {
      expiresIn: 86400,
    });
  }

  /**
   *
   * @param payload { userId, roleId, createdAt}
   * @returns return a jwt token
   */
  private generateRefreshToken(payload: ITokenPayload): string {
    return jwt.sign(payload, configs.app.secret, {
      expiresIn: 2592000,
    });
  }

  /**
   *
   * @param password
   * @param hashPassword
   * @returns true/false
   */
  private comparePassword(password: string, hashPassword: string): boolean {
    return bcryptjs.compareSync(password, hashPassword);
  }

  /**
   *
   * @param token
   * @returns {userId, roleId, createdAt}
   */
  private async verifyToken(token: string): Promise<ITokenPayload> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, configs.app.secret, (error, data) => {
        if (error) {
          return reject(error);
        }
        return resolve(data as ITokenPayload);
      });
    });
  }
}

export default new AuthService();
