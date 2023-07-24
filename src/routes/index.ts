import express, { Router } from "express";
import UserRoute from "@routes/user";
const route: Router = express.Router();

route.use("/user", UserRoute);

export default route;
