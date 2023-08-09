import {
  ICreateBody,
  IDeleteParams,
  IDetailParams,
  IDisableParams,
  IEnableParams,
  IListQuery,
  IUpdateBody,
  IUpdateParams,
} from "@interfaces/requests/manage/user";
import { NextFunction, Request, Response } from "express";
import UserService from "@services/manage/user";
import RList from "@validations/manage/user/list";
import RCreate from "@validations/manage/user/create";
import RUpdate from "@validations/manage/user/update";
import RDisable from "@validations/manage/user/disable";
import REnable from "@validations/manage/user/enable";
import RDelete from "@validations/manage/user/delete";
import RDetail from "@validations/manage/user/detail";

/**
 * @Controller("/users")
 */
class UserController {
  /**
   *
   * @method "get"
   * @path "/"
   * @param req
   * @param res
   * @param next
   */
  public async list(req: Request, res: Response, next: NextFunction) {
    const request: RList = new RList({
      query: req.query,
    });

    const query: IListQuery = request.query();
    const { count, users } = await UserService.list(query);

    next({
      code: 0,
      message: "success",
      data: {
        page: query.page,
        limit: query.limit,
        count,
        users,
      },
    });
  }

  /**
   *
   * @method "get"
   * @path "/:id"
   * @param req
   * @param res
   * @param next
   */
  public async detail(req: Request, res: Response, next: NextFunction) {
    const request: RDetail = new RDetail({
      params: req.params,
    });

    const params: IDetailParams = request.params();

    next({
      code: 0,
      message: "success",
      data: await UserService.detail(params.id),
    });
  }

  /**
   *
   * @method "post"
   * @path "/"
   * @param req
   * @param res
   * @param next
   */
  public async create(req: Request, res: Response, next: NextFunction) {
    const request: RCreate = new RCreate({
      body: req.body,
    });

    const body: ICreateBody = request.body();

    next({
      code: 0,
      message: "success",
      data: {
        id: await UserService.create(body),
      },
    });
  }

  /**
   *
   * @method "put"
   * @path "/:id"
   * @param req
   * @param res
   * @param next
   */
  public async update(req: Request, res: Response, next: NextFunction) {
    const request: RUpdate = new RUpdate({
      body: req.body,
      params: req.params,
    });

    const body: IUpdateBody = request.body();
    const params: IUpdateParams = request.params();
    await UserService.update({
      ...params,
      ...body,
    });
    next({
      code: 0,
      message: "success",
    });
  }

  /**
   *
   * @method "patch"
   * @path "/:id/disable"
   * @param req
   * @param res
   * @param next
   */
  public async disable(req: Request, res: Response, next: NextFunction) {
    const request: RDisable = new RDisable({
      params: req.params,
    });

    const params: IDisableParams = request.params();
    await UserService.disable(params.id);
    next({
      code: 0,
      message: "success",
    });
  }

  /**
   *
   * @method "patch"
   * @path "/:id/enable"
   * @param req
   * @param res
   * @param next
   */
  public async enable(req: Request, res: Response, next: NextFunction) {
    const request: REnable = new REnable({
      params: req.params,
    });

    const params: IEnableParams = request.params();
    await UserService.enable(params.id);
    next({
      code: 0,
      message: "success",
    });
  }

  /**
   *
   * @method "delete"
   * @path "/:id"
   * @param req
   * @param res
   * @param next
   */
  public async delete(req: Request, res: Response, next: NextFunction) {
    const request: RDelete = new RDelete({
      params: req.params,
    });

    const params: IDeleteParams = request.params();
    await UserService.delete(params.id);
    next({
      code: 0,
      message: "success",
    });
  }
}

export default new UserController();
