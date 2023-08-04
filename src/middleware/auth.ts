import { Request, Response, NextFunction } from "express";
import { IUser } from "@interfaces/models/user";
import { MUser } from "@models/user";
import jwt from "jsonwebtoken";
import configs from "@configs/index";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token: any = req.headers.token;
    if (!token) {
      return next({
        code: -10,
        message: "missing token",
      });
    }
    const verifyPayload: jwt.JwtPayload = await verifyToken(token);
    try {
      const user: IUser | null = await MUser.findOne({
        where: {
          id: verifyPayload.id,
        },
        raw: true,
        nest: true,
      });
      if (!user) {
        throw Error("user not found");
      }
      res.locals.user = user;
    } catch (error) {
      return next(error);
    }
    next();
  } catch (error: any) {
    next({
      code: -10,
      message: error.message,
    });
  }
};

const verifyToken = async (token: string): Promise<jwt.JwtPayload> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, configs.app.secret, (error, data) => {
      if (error) {
        return reject(error);
      }
      return resolve(data as jwt.JwtPayload);
    });
  });
};
