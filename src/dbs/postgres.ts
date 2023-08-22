import configs from "@configs/index";
import * as Sequelize from "sequelize";
// import Modals from "@models/index";
import bcryptjs from "bcryptjs";

const {
  app: { env },
  postgres: { host, port, name, username, password },
} = configs;

const sequelize: Sequelize.Sequelize = new Sequelize.Sequelize({
  host: host,
  port: Number(port),
  database: name,
  username: username,
  password: password,
  dialect: "postgres",
  logging: env !== "production" ? false : console.log,
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
  // Modals(sequelize);

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
