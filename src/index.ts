import "dotenv/config";
import express, { Express } from "express";
import "express-async-errors";
import cors from "cors";

import { getEnv } from "./config/env";
export const env = getEnv(process.env);

import "./config/db";
import APIRoute from "./routes/index";
// import syncEmployeeData from "./utils/sync-employee-data";

const startServer = async () => {
  // syncEmployeeData();
  const app: Express = express();
  app.use(cors());
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: false,
    })
  );

  app.use("/api", APIRoute);

  const port = process.env.PORT || 3000;
  app.listen(port);
  console.log("Server is running at http://localhost:" + port);
};

startServer();
