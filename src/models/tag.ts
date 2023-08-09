import { DataTypes, Model, Sequelize } from "sequelize";
import { ITag } from "@interfaces/models/tag";
import { MPostTag } from "./post-tag";

export class MTag extends Model<ITag> implements ITag {
  public id: number;
  public title: string;
  public metaTitle: string;
  public slug: string;
  public content: string | null;
  public enable: boolean;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
}

export default (sequelize: Sequelize): typeof MTag => {
  MTag.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
      tableName: "tag",
    }
  );
  return MTag;
};

export const TagAssociated = () => {
  MTag.hasMany(MPostTag, {
    as: "postTags",
    foreignKey: "tagId",
    sourceKey: "id",
  });
};
