import { NextFunction, Request, Response } from "express";
import accountService from "@services/account";

/**
 * @Controller("/me")
 */
class UserController {
  /**
   *
   * @method "get"
   * @path "/profile"
   * @param req
   * @param res
   * @param next
   */
  public async profile(req: Request, res: Response, next: NextFunction) {
    next({
      code: 0,
      message: "success",
      data: await accountService.profile(res.locals.user.id),
    });
  }
}

export default new UserController();
