import { IOnLeave } from "./../interfaces/models/on-leave";
import { DataTypes, Model, Sequelize } from "sequelize";
import { MEmployee } from "./employee";

export class MOnLeave extends Model<IOnLeave> implements IOnLeave {
  public id: number;
  public employee_id: number;
  public start_date: Date;
  public end_date: Date;
  public reason: string;
  public status: string;
  public note: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
}

export default (sequelize: Sequelize): typeof MOnLeave => {
  MOnLeave.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      employee_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      start_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      end_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      reason: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      note: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      paranoid: true,
      schema: "hr",
      tableName: "on_leaves",
    }
  );
  return MOnLeave;
};

export const onLeaveAssociated = () => {
  MOnLeave.hasOne(MEmployee, {
    as: "employee",
    foreignKey: "id",
    sourceKey: "employee_id",
  });
};
