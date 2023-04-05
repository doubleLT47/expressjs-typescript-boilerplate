import { NextFunction, Request, Response } from "express";
import { RList } from "../../../requests/web/time-keeping/list";
import { IListParams, IListQuery } from "../../../interfaces/requests/web/time-kepping";
import { IEmployee } from "../../../interfaces/employee";

export default async (req: Request, res: Response, next: NextFunction) => {
    const request: RList = new RList({
      query: req.query,
      params: req.params,
    });
    const params: IListParams = request.params();
    const query: IListQuery = request.query();
    const employee: IEmployee = await
};
