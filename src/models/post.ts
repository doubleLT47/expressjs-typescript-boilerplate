import { DataTypes, Model, Sequelize, ModelValidateOptions } from "sequelize";
import { IPost } from "@interfaces/models/post";
import { MPostCategory } from "./post-category";
import { MUser } from "./user";
import { MPostComment } from "./post-comment";
import { MPostTag } from "./post-tag";

export class MPost extends Model<IPost> implements IPost {
  public id: number;
  public userId: number;
  public title: string;
  public metaTitle: string;
  public slug: string; //unique
  public description: string | null;
  public content: string;
  public thumb: string | null;
  public published: boolean;
  public publishedAt: Date | null;
  public type: string; // default, event,
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
}

export default (sequelize: Sequelize): typeof MPost => {
  MPost.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING(),
        allowNull: false,
      },
      metaTitle: {
        type: DataTypes.STRING(),
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING(),
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      thumb: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      published: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      publishedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      type: {
        type: DataTypes.STRING,
        defaultValue: "default",
        validate: {
          isIn: {
            args: [["default", "event", "news"]],
            msg: "type must be default or  event  or news",
          },
        },
      },
    },
    {
      sequelize,
      paranoid: true,
      schema: "core",
      tableName: "post",
    }
  );
  return MPost;
};

export const PostAssociated = () => {
  MPost.hasMany(MPostCategory, {
    as: "postCategories",
    foreignKey: "postId",
    sourceKey: "id",
  });
  MPost.hasMany(MPostTag, {
    as: "postTags",
    foreignKey: "postId",
    sourceKey: "id",
  });
  MPost.hasMany(MPostComment, {
    as: "comments",
    foreignKey: "postId",
    sourceKey: "id",
  });
  MPost.hasOne(MUser, {
    as: "user",
    foreignKey: "id",
    sourceKey: "userId",
  });
};
