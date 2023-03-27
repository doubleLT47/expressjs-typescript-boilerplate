import "dotenv/config";
import express, { Express } from "express";
import "express-async-errors";
import cors from "cors";
import { getEnv } from "./config/env";
import db from "./config/db";
import APIRoute from "./api/index";

export const env = getEnv(process.env);

const startServer = async () => {
  const app: Express = express();
  app.use(cors());
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: false,
    })
  );

  await db.connect();

  app.use("/api", APIRoute);

  const port = process.env.PORT || 3000;
  app.listen(port);
  console.log("Server is running at http://localhost:" + port);
};

startServer();
