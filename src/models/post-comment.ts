import { IPostComment } from "./../interfaces/models/post-comment";
import { DataTypes, Model, Sequelize, ModelValidateOptions } from "sequelize";
import { MPost } from "./post";
import { MUser } from "./user";

export class MPostComment extends Model<IPostComment> implements IPostComment {
  public id: number;
  public postId: number;
  public userId: number;
  public parentId: number | null;
  public content: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
}

export default (sequelize: Sequelize): typeof MPostComment => {
  MPostComment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      postId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      parentId: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      paranoid: true,
      tableName: "post_comment",
    }
  );
  return MPostComment;
};

export const PostCommentAssociated = () => {
  MPostComment.hasOne(MPost, {
    as: "post",
    foreignKey: "id",
    sourceKey: "postId",
  });
  MPostComment.hasOne(MUser, {
    as: "user",
    foreignKey: "id",
    sourceKey: "userId",
  });
};
