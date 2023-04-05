import express, { Router } from "express";
import EmployeeController from "../../controllers/web/employee";

const route: Router = express.Router();

route.get("/:zalo_id", EmployeeController.Detail);

export default route;
