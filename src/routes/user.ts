import express, { Router } from "express";
import UserController from "@controllers/user";
const router: Router = express.Router();

router.get("/", UserController.List);

export default router;
