import { NextFunction, Request, Response } from "express";
import accountService from "@services/account";

/**
 * @Controller("/accounts")
 */
class UserController {
  /**
   * @get("/profile")
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
