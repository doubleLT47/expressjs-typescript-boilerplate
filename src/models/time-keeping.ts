import { ITimeKeeping } from "./../interfaces/models/time-keeping";

import { DataTypes, Model, Sequelize } from "sequelize";
import { MEmployee } from "./employee";
import { MShift } from "./shift";

export class MTimeKeeping extends Model<ITimeKeeping> implements ITimeKeeping {
  public id: number;
  public employee_id: number;
  public date: Date;
  public checkin_time: Date;
  public checkout_time?: Date;
  public note?: string;
  public type: number;
  public shift_id?: number;
  public start_time?: Date;
  public end_time?: Date;
  public status: string;
  public is_late: number;
  public is_early: number;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
}

export default (sequelize: Sequelize): typeof MTimeKeeping => {
  MTimeKeeping.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      employee_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      checkin_time: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      checkout_time: {
        type: DataTypes.TIME,
        allowNull: true,
      },
      note: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      type: {
        type: DataTypes.TINYINT,
        allowNull: false,
      },
      shift_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      start_time: {
        type: DataTypes.TIME,
        allowNull: true,
      },
      end_time: {
        type: DataTypes.TIME,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      is_late: {
        type: DataTypes.TINYINT,
        allowNull: false,
      },
      is_early: {
        type: DataTypes.TINYINT,
        allowNull: false,
      },
    },
    {
      sequelize,
      schema: "hr",
      tableName: "time_keeping_histories",
      paranoid: true,
    }
  );
  return MTimeKeeping;
};

export const timeKeepingAssociated = () => {
  MTimeKeeping.hasOne(MEmployee, {
    as: "employee",
    foreignKey: "id",
    sourceKey: "employee_id",
  });
  MTimeKeeping.hasOne(MShift, {
    as: "shift",
    foreignKey: "id",
    sourceKey: "shift_id",
  });
};
