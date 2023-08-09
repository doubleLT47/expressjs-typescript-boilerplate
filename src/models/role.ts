import { DataTypes, Model, Sequelize } from "sequelize";
import { IRole } from "@interfaces/models/role";

export class MRole extends Model<IRole> implements IRole {
  public id: number;
  public name: string;
  public permission: any;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
}

export default (sequelize: Sequelize): typeof MRole => {
  MRole.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      permission: {
        type: DataTypes.JSONB,
        defaultValue: {},
      },
    },
    {
      sequelize,
      paranoid: true,
      schema: "core",
      tableName: "role",
    }
  );
  return MRole;
};
