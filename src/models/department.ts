import { DataTypes, Model, Sequelize } from "sequelize";
import { IDepartment } from "../interfaces/models/department";

export class MDepartment extends Model<IDepartment> implements IDepartment {
  public id: number;
  public name: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
}

export default (sequelize: Sequelize): typeof MDepartment => {
  MDepartment.init(
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
    },
    {
      sequelize,
      paranoid: true,
      schema: "hr",
      tableName: "n_departments",
    }
  );
  return MDepartment;
};
