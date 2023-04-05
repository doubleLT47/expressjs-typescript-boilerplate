import express, { Router } from "express";
import responseHandle from "../middleware/response-handle";

const route: Router = express.Router();

route.use(responseHandle);

export default route;
