import { IWarningDiaryProof } from "../interfaces/models/warning-diary-proof";
import { DataTypes, Model, Sequelize } from "sequelize";
import { MWarningDiary } from "./warning-diary";

export class MWarningDiaryProof extends Model<IWarningDiaryProof> implements IWarningDiaryProof {
  public id: number;
  public diary_id: number;
  public name: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
}

export default (sequelize: Sequelize): typeof MWarningDiaryProof => {
  MWarningDiaryProof.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      diary_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
      tableName: "warning_diary_proofs",
    }
  );
  return MWarningDiaryProof;
};

export const warningDiaryProofAssociated = () => {
  MWarningDiaryProof.hasOne(MWarningDiary, {
    as: "warning_diary",
    foreignKey: "id",
    sourceKey: "diary_id",
  });
};
