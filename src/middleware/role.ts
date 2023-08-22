import { NextFunction, RequestHandler, Request, Response } from "express";

/**
 * @param role has format "module.action", ex: order.read
 */
export default (role: string): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // const userRole: IRole = res.locals.user.role;

    // if (userRole.name === "Admin") {
    //   return next();
    // }

    // const [module, action] = role.split(".");

    // if (userRole.permission[module][action])
    //   return next({
    //     code: -11,
    //     message: "Permission denied",
    //   });

    next();
  };
};
