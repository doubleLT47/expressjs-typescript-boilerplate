import configs from "@configs/index";
import * as Sequelize from "sequelize";
import Modals from "@models/index";
import { MUser } from "@models/user";
import bcryptjs from "bcryptjs";
import { MRole } from "@models/role";

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
  logging: env !== "production",
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
  await MRole.bulkCreate(
    [
      {
        name: "Admin",
        permission: {
          user: {
            read: true,
            update: true,
            create: true,
            delete: true,
          },
          post: {
            read: true,
            update: true,
            create: true,
            delete: true,
          },
          comment: {
            read: true,
            update: true,
            create: true,
            delete: true,
          },
          navigation: {
            read: true,
            update: true,
            create: true,
            delete: true,
          },
          policy: {
            read: true,
            update: true,
            create: true,
            delete: true,
          },
        },
      },
      {
        name: "Manager",
        permission: {},
      },
      {
        name: "Staff",
        permission: {},
      },
    ],
    {
      ignoreDuplicates: true,
      conflictAttributes: ["name"],
    }
  );
  const admin: MUser | null = await MUser.findOne({
    where: {
      email: "info@thegioiwhey.com",
    },
  });

  if (!admin) {
    const adminRole: MRole | null = await MRole.findOne({
      where: {
        name: "Admin",
      },
    });

    if (!adminRole) {
      throw "No admin role";
    }

    await MUser.create({
      lastName: "Thegioiwhey",
      firstName: "Admin",
      phone: "0901315067",
      password: bcryptjs.hashSync("thegioiwhey@123"),
      email: "info@thegioiwhey.com",
      enable: true,
      roleId: adminRole.dataValues.id as number,
      profile: {
        avatar: null,
        dob: null,
        address: null,
        password: {
          code: null,
          active: true,
          activeAt: new Date(),
        },
        accessToken: null,
        refreshToken: null,
      },
    });
  }
};

export default {
  sequelize,
  Sequelize,
};
