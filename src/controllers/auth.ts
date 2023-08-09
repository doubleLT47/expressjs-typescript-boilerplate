import { IForgotPasswordBody, ILoginBody, INewPasswordBody } from "@interfaces/requests/auth";
import RLogin from "@validations/auth/login";
import { NextFunction, Request, Response } from "express";
import AuthService from "@services/auth";
import RForgotPassword from "@validations/auth/forgot-password";
import RNewPassword from "@validations/auth/new-password";

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
  public async login(req: Request, res: Response, next: NextFunction) {
    const request: RLogin = new RLogin({
      body: req.body,
    });
    const body: ILoginBody = request.body();
    next({
      code: 0,
      message: "success",
      data: await AuthService.login(body),
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
  public async forgotPassword(req: Request, res: Response, next: NextFunction) {
    const request: RForgotPassword = new RForgotPassword({
      body: req.body,
    });
    const body: IForgotPasswordBody = request.body();
    await AuthService.forgotPassword(body.email);
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
  public async newPassword(req: Request, res: Response, next: NextFunction) {
    const request: RNewPassword = new RNewPassword({
      body: req.body,
    });
    const body: INewPasswordBody = request.body();
    await AuthService.newPassWord(body);
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
    await AuthService.logout(res.locals.user);
    next({
      code: 0,
      message: "success",
    });
  }
}

export default new AuthController();
