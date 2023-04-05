import { IShift } from "./../interfaces/models/shift";
import { DataTypes, Model, Sequelize } from "sequelize";

export class MShift extends Model<IShift> implements IShift {
  public id: number;
  public name: string;
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
