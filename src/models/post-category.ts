import { DataTypes, Model, Sequelize } from "sequelize";
import { IPostCategory } from "@interfaces/models/post-category";
import { MPost } from "./post";
import { MCategory } from "./category";

export class MPostCategory extends Model<IPostCategory> implements IPostCategory {
  public postId: number;
  public categoryId: number;
}

export default (sequelize: Sequelize): typeof MPostCategory => {
  MPostCategory.init(
    {
      postId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
    },
    {
      sequelize,
      paranoid: true,
      timestamps: false,
      tableName: "post_category",
    }
  );
  return MPostCategory;
};

export const PostCategoryAssociated = () => {
  MPostCategory.hasOne(MPost, {
    as: "post",
    foreignKey: "id",
    sourceKey: "postId",
  });
  MPostCategory.hasOne(MCategory, {
    as: "category",
    foreignKey: "id",
    sourceKey: "categoryId",
  });
};
