import { IShift } from "./../interfaces/models/shift";
import { DataTypes, Model, Sequelize } from "sequelize";
import { MDepartment } from "./department";

export class MShift extends Model<IShift> implements IShift {
  public id: number;
  public name: string;
  public department_id: number;
  public start_time: Date;
  public end_time: Date;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
}

export default (sequelize: Sequelize): typeof MShift => {
  MShift.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      department_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      start_time: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      end_time: {
        type: DataTypes.TIME,
        allowNull: false,
      },
    },
    {
      sequelize,
      paranoid: true,
      schema: "hr",
      tableName: "n_shifts",
    }
  );
  return MShift;
};

export const shiftAssociated = () => {
  MShift.hasOne(MDepartment, {
    as: "department",
    foreignKey: "id",
    sourceKey: "department_id",
  });
};
