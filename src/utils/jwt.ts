import jwt from "jsonwebtoken";
import configs from "@configs/index";

export function generateToken(
  payload: Object,
  keyName: "accessTokenPrivateKey" | "refreshTokenPrivateKey",
  options?: jwt.SignOptions | undefined
): string {
  const signingKey: string = parseKey(keyName);

  return jwt.sign(payload, signingKey, {
    ...(options && options),
    algorithm: "RS256",
  });
}

export function verifyToken(
  token: string,
  keyName: "accessTokenPublicKey" | "refreshTokenPublicKey"
):
  | {
      valid: boolean;
      expired: boolean;
      decoded: string | jwt.JwtPayload;
    }
  | {
      valid: boolean;
      expired: boolean;
      decoded: null;
    } {
  const publicKey: string = parseKey(keyName);

  try {
    const decoded = jwt.verify(token, publicKey);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (error: any) {
    return {
      valid: true,
      expired: error.message === "jwt expired",
      decoded: null,
    };
  }
}

const parseKey = (
  keyName:
    | "accessTokenPrivateKey"
    | "refreshTokenPrivateKey"
    | "accessTokenPublicKey"
    | "refreshTokenPublicKey"
): string => {
  return Buffer.from(configs.app[keyName], "base64").toString("ascii");
};
