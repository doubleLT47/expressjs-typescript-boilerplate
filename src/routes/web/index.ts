import express, { Router } from "express";
import EmployeeRoute from "./employee";
const route: Router = express.Router();

route.use("/employee", EmployeeRoute);

export default route;
