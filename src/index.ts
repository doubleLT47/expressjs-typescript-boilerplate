import "dotenv/config";
import express, { Express } from "express";
import "express-async-errors";
import cors from "cors";
import { IEnv } from "@interfaces/env";

import { getEnv } from "@configs/env";
export const env: IEnv = getEnv(process.env);

import APIRoute from "./routes/index";
import { initializeDatabase } from "@configs/db";
import responseHandle from "@middleware/response-handle";

const startServer = async () => {
  await initializeDatabase(false);

  const app: Express = express();
  app.use(cors());
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: false,
    })
  );

  app.use("/api", APIRoute);
  app.use(responseHandle);

  const port = process.env.PORT || 3000;
  app.listen(port);
  console.log("Server is running at http://localhost:" + port);
};

startServer();
