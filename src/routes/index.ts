import express, { Router } from "express";
import responseHandle from "../middleware/response-handle";
import WebRouter from "./web";
const route: Router = express.Router();

route.use(WebRouter);
route.use(responseHandle);

export default route;
