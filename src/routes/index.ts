import express, { Router } from "express";
import AuthRoute from "@routes/auth";
const route: Router = express.Router();

route.use("/auth", AuthRoute);

export default route;
