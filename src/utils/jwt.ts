import { ITokenPayload } from "@services/auth";
import jwt from "jsonwebtoken";
import configs from "@configs/index";

/**
 *
 * @param payload { userId, roleId, createdAt}
 * @returns return a jwt token
 */
export function generateToken(payload: ITokenPayload): string {
  return jwt.sign(payload, configs.app.secret, {
    expiresIn: 86400,
  });
}

/**
 *
 * @param payload { userId, roleId, createdAt}
 * @returns return a jwt token
 */
export function generateRefreshToken(payload: ITokenPayload): string {
  return jwt.sign(payload, configs.app.secret, {
    expiresIn: 2592000,
  });
}

/**
 *
 * @param token
 * @returns {userId, roleId, createdAt}
 */
export async function verifyToken(token: string): Promise<ITokenPayload> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, configs.app.secret, (error, data) => {
      if (error) {
        return reject(error);
      }
      return resolve(data as ITokenPayload);
    });
  });
}
