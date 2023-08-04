import express, { Router } from "express";
import AccountRoute from "@routes/account";
const route: Router = express.Router();

route.use("/me", AccountRoute);

export default route;
