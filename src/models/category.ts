import { DataTypes, Model, Sequelize } from "sequelize";
import { ICategory } from "@interfaces/models/category";
import { MPostCategory } from "./post-category";

export class MCategory extends Model<ICategory> implements ICategory {
  public id: number;
  public parentId: number | null;
  public title: string;
  public metaTitle: string;
  public slug: string;
  public content: string | null;
  public enable: boolean;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
}

export default (sequelize: Sequelize): typeof MCategory => {
  MCategory.init(
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
      content: {
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
      tableName: "category",
    }
  );
  return MCategory;
};

export const CategoryAssociated = () => {
  MCategory.hasMany(MPostCategory, {
    as: "postCategories",
    foreignKey: "categoryId",
    sourceKey: "id",
  });
};
