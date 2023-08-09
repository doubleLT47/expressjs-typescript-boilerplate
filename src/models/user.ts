import { DataTypes, Model, Sequelize } from "sequelize";
import { IUser } from "@interfaces/models/user";
import { MRole } from "./role";
import { MPost } from "./post";

export class MUser extends Model<IUser> implements IUser {
  public id?: number;
  public lastName: string;
  public firstName: string;
  public middleName?: string;
  public phone: string;
  public password: string;
  public email: string;
  public enable: boolean;
  public roleId: number;
  public profile: {
    avatar: string | null;
    dob: Date | null;
    address: string | null;
    password: { code: string | null; active: boolean; activeAt: Date | null };
    accessToken: string | null;
    refreshToken: string | null;
  };
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
}

export default (sequelize: Sequelize): typeof MUser => {
  MUser.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      lastName: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      middleName: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING(11),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      enable: {
        type: DataTypes.BOOLEAN(),
        defaultValue: true,
      },
      roleId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      profile: {
        type: DataTypes.JSONB,
        defaultValue: {
          avatar: null,
          dob: null,
          address: null,
          password: {
            code: null,
            active: false,
            activeAt: null,
          },
          accessToken: null,
          refreshToken: null,
        },
      },
    },
    {
      sequelize,
      paranoid: true,
      schema: "core",
      tableName: "user",
    }
  );
  return MUser;
};

export const UserAssociated = () => {
  MUser.hasOne(MRole, {
    as: "role",
    foreignKey: "id",
    sourceKey: "roleId",
  });
  MUser.hasMany(MPost, {
    as: "posts",
    foreignKey: "userId",
    sourceKey: "id",
  });
};
