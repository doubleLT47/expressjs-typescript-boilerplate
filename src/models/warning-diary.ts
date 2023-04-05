import { IWarningDiary } from "./../interfaces/models/warning-diary";

import { DataTypes, Model, Sequelize } from "sequelize";

export class MWarningDiary extends Model<IWarningDiary> implements IWarningDiary {
  public id: number;
  public related_employee: string;
  public note: string;
  public level: number;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
}

export default (sequelize: Sequelize): typeof MWarningDiary => {
  MWarningDiary.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      related_employee: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      note: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      level: {
        type: DataTypes.TINYINT,
        allowNull: false,
      },
    },
    {
      sequelize,
      paranoid: true,
      schema: "hr",
      tableName: "warning_diaries",
    }
  );
  return MWarningDiary;
};
