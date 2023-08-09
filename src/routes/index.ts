import express, { Router } from "express";
import AccountRoute from "@routes/account";
import ManageRoute from "@routes/manage";
import AuthRoute from "@routes/auth";
const route: Router = express.Router();

route.use("/me", AccountRoute);
route.use("/auth", AuthRoute);
route.use("/manage", ManageRoute);

export default route;
