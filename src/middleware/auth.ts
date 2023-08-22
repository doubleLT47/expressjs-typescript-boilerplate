// import authService from "@services/auth";
import { Request, Response, NextFunction } from "express";

export default async (req: Request, res: Response, next: NextFunction) => {
  const token: any = req.headers.token;
  if (!token) {
    return next({
      code: -10,
      message: "missing token",
    });
  }
  // res.locals.user = await authService.getUserByToken(token);
  next();
};
