import express, { Router } from "express";
import UserController from "@controllers/manage/user";
import AuthMiddleware from "@middleware/auth";
import CheckRoleMiddleware from "@middleware/role";

const router: Router = express.Router();

router.get("/users", AuthMiddleware, CheckRoleMiddleware("user.read"), UserController.list);
router.get("/users/:id", AuthMiddleware, CheckRoleMiddleware("user.read"), UserController.detail);
router.post("/users", AuthMiddleware, CheckRoleMiddleware("user.create"), UserController.create);
router.put("/users/:id", AuthMiddleware, CheckRoleMiddleware("user.update"), UserController.update);
router.patch(
  "/users/:id/disable",
  AuthMiddleware,
  CheckRoleMiddleware("user.update"),
  UserController.disable
);
router.patch(
  "/users/:id/enable",
  AuthMiddleware,
  CheckRoleMiddleware("user.update"),
  UserController.enable
);
router.delete(
  "/users/:id",
  AuthMiddleware,
  CheckRoleMiddleware("user.delete"),
  UserController.delete
);

export default router;
