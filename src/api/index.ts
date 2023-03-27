import express, { Router } from "express";
import errorHandle from "../middleware/error-handle";
import topicRoute from "./topic";

const route: Router = express.Router();

route.use("/topic", topicRoute);

route.use(errorHandle);

export default route;
