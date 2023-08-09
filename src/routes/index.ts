import express, { Router } from "express";
import AccountRoute from "@routes/account";
import AuthRoute from "@routes/auth";
const route: Router = express.Router();

route.use("/me", AccountRoute);
route.use("/auth", AuthRoute);

export default route;
