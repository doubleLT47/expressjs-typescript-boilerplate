import * as Sequelize from "sequelize";
import { env } from "../index";
import Modals from "@models/index";

const sequelize: Sequelize.Sequelize = new Sequelize.Sequelize({
  host: env.DB_HOST,
  port: env.DB_PORT,
  database: env.DB_NAME,
  username: env.DB_USER,
  password: env.DB_PWD,
  dialect: "mssql",
  timezone: "+07:00",
  logging: false,
  define: {
    charset: "utf8mb4",
    collate: "utf8mb4_general_ci",
    underscored: true,
    freezeTableName: true,
  },
});

export const initializeDatabase = async (sync: boolean = false) => {
  await sequelize.authenticate();

  console.info(`---------------------------------`);
  console.info(`🚀 Connect to database success`);
  console.info(`---------------------------------`);
  Modals(sequelize);

  if (sync) {
    await sequelize.sync({
      force: false,
      alter: true,
    });

    console.log("=-=- Sync DB Success -=-=");
  }
};

export default {
  sequelize,
  Sequelize,
};
