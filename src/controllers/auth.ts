import { IForgotPasswordBody, ILoginBody, INewPasswordBody } from "@interfaces/requests/auth";
import { NextFunction, Request, Response } from "express";
// import AuthService from "@services/auth";

/**
 * @Controller("/auth")
 */
class AuthController {
  /**
   *
   * @method "post"
   * @path "/login"
   * @param req
   * @param res
   * @param next
   */
  public async login(req: Request<{}, {}, ILoginBody>, res: Response, next: NextFunction) {
    const body: ILoginBody = req.body;
    console.log(body);
    next({
      code: 0,
      message: "success",
      // data: await AuthService.login(body),
    });
  }

  /**
   *
   * @method "post"
   * @path "/forgot-password"
   * @param req
   * @param res
   * @param next
   */
  public async forgotPassword(
    req: Request<{}, {}, IForgotPasswordBody>,
    res: Response,
    next: NextFunction
  ) {
    const body: IForgotPasswordBody = req.body;
    // await AuthService.forgotPassword(body.email);
    next({
      code: 0,
      message: "success",
    });
  }

  /**
   *
   * @method "post"
   * @path "/new-password"
   * @param req
   * @param res
   * @param next
   */
  public async newPassword(
    req: Request<{}, {}, INewPasswordBody>,
    res: Response,
    next: NextFunction
  ) {
    const body: INewPasswordBody = req.body;
    // await AuthService.newPassWord(body);
    next({
      code: 0,
      message: "success",
    });
  }

  /**
   *
   * @method "post"
   * @path "/logout"
   * @param req
   * @param res
   * @param next
   */
  public async logout(req: Request, res: Response, next: NextFunction) {
    // await AuthService.logout(res.locals.user);
    next({
      code: 0,
      message: "success",
    });
  }
}

export default new AuthController();
