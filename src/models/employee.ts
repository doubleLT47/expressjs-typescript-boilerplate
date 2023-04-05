import { DataTypes, Model, Sequelize } from "sequelize";
import { IEmployee } from "../interfaces/models/employee";
import { MDepartment } from "./department";

export class MEmployee extends Model<IEmployee> implements IEmployee {
  public id: number;
  public last_name: string;
  public first_name: string;
  public id_on_sapogo?: string;
  public id_on_chatbot?: string;
  public id_on_manychat?: string;
  public phone_number?: string;
  public password?: string;
  public dob?: string;
  public email?: string;
  public address?: string;
  public status: number;
  public sapogo_active?: number;
  public basic_salary?: number;
  public basic_number_working_days?: number;
  public other_agreement?: string;
  public bonus_overtime_percent?: number;
  public bonus_holiday_percent?: number;
  public reset_password_token?: string;
  public role?: string;
  public department_id?: number;
  public zalo_uid?: string;
  public active_at: Date;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
}

export default (sequelize: Sequelize): typeof MEmployee => {
  MEmployee.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      last_name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      first_name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      id_on_sapogo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      id_on_chatbot: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      id_on_manychat: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phone_number: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      dob: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      status: {
        type: DataTypes.TINYINT,
        allowNull: true,
      },
      sapogo_active: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      basic_salary: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      basic_number_working_days: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      other_agreement: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      bonus_overtime_percent: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      bonus_holiday_percent: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      reset_password_token: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      department_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      zalo_uid: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      active_at: {
        type: DataTypes.DATEONLY,
      },
    },
    {
      sequelize,
      paranoid: true,
      schema: "hr",
      tableName: "n_employees",
    }
  );
  return MEmployee;
};

export const employeeAssociated = () => {
  MEmployee.hasOne(MDepartment, {
    as: "department",
    foreignKey: "id",
    sourceKey: "department_id",
  });
};
