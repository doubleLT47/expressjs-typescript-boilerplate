import express, { Router } from "express";
import * as topicController from "../controllers/topic";

const route: Router = express.Router();

route.get("/", topicController.list);
route.post("/", topicController.create);
route.put("/:id", topicController.update);
route.delete("/", topicController.remove);

export default route;
