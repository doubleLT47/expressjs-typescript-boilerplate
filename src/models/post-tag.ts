import { DataTypes, Model, Sequelize } from "sequelize";
import { IPostTag } from "@interfaces/models/post-tag";
import { MPost } from "./post";
import { MTag } from "./tag";

export class MPostTag extends Model<IPostTag> implements IPostTag {
  public postId: number;
  public tagId: number;
}

export default (sequelize: Sequelize): typeof MPostTag => {
  MPostTag.init(
    {
      postId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      tagId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
    },
    {
      sequelize,
      paranoid: true,
      timestamps: false,
      tableName: "post_tag",
    }
  );
  return MPostTag;
};

export const PostTagAssociated = () => {
  MPostTag.hasOne(MPost, {
    as: "post",
    foreignKey: "id",
    sourceKey: "postId",
  });
  MPostTag.hasOne(MTag, {
    as: "tag",
    foreignKey: "id",
    sourceKey: "tagId",
  });
};
