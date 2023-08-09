import "dotenv/config";
import "express-async-errors";
import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";

import "@configs/env";
import APIRoute from "@routes/index";
import { initializeDatabase } from "@dbs/postgres";
import responseHandle from "@middleware/response-handle";
import configs from "@configs/index";
import { checkOverload } from "@helpers/check-connect";

const startServer = async () => {
  const app: Express = express();

  app.use(morgan("dev"));

  // setting base
  app.use(
    helmet.frameguard({
      action: "deny",
    })
  );
  // strict transport security
  const reqDuration = 2629746000;
  app.use(
    helmet.hsts({
      maxAge: reqDuration,
    })
  );

  // content security policy
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        scriptSrc: ["'self'"],
        styleSrc: ["'self'"],
      },
    })
  );
  // x content type options
  app.use(helmet.noSniff());
  // x xss protection
  app.use(helmet.xssFilter());
  // referrer policy
  app.use(
    helmet.referrerPolicy({
      policy: "no-referrer",
    })
  );

  app.use(
    compression({
      level: 6, // level compress
      threshold: 100 * 1024, // > 100kb threshold to compress
      filter: (req) => {
        return !req.headers["x-no-compress"];
      },
    })
  );

  app.use(cors());
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: false,
    })
  );

  if (configs.mongo.enable) {
    require("@dbs/mongo");
    checkOverload();
  }

  if (configs.postgres.enable) {
    await initializeDatabase(false);
  }

  if (configs.s3.enable) {
    require("@configs/s3");
  }

  if (configs.app.env === "production") {
    require("@cron");
  }

  if (configs.email.enable) {
    require("@configs/email");
  }

  app.use("/api", APIRoute);
  app.use("*", (req: Request, res: Response, next: NextFunction) => {
    next({
      code: -13,
      message: `api not found`,
    });
  });
  app.use(responseHandle);

  const port = configs.app.port || 3000;
  app.listen(port);
  console.log("Server is running at http://localhost:" + port);
};

startServer();
