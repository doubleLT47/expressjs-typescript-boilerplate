import { DataTypes, Model, Sequelize } from "sequelize";
import { INavigation } from "@interfaces/models/navigation";

export class MNavigation extends Model<INavigation> implements INavigation {
  public id: number;
  public parentId: number | null;
  public title: string;
  public metaTitle: string;
  public slug: string;
  public redirectLink: string | null;
  public enable: boolean;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
}

export default (sequelize: Sequelize): typeof MNavigation => {
  MNavigation.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      parentId: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      metaTitle: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      redirectLink: {
        type: DataTypes.STRING(),
        allowNull: true,
      },
      enable: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      paranoid: true,
      schema: "core",
      tableName: "navigation",
    }
  );
  return MNavigation;
};
