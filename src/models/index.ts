import Sequelize from "sequelize";
import timeKeeping, { timeKeepingAssociated } from "./time-keeping";
import employee, { employeeAssociated } from "./employee";
import department from "./department";
import onLeave, { onLeaveAssociated } from "./on-leave";
import shift from "./shift";
import warningDiary from "./warning-diary";
import warningDiaryProof, { warningDiaryProofAssociated } from "./warning-diary-proof";

export default (sequelize: Sequelize.Sequelize): void => {
  timeKeeping(sequelize);
  employee(sequelize);
  department(sequelize);
  onLeave(sequelize);
  shift(sequelize);
  warningDiary(sequelize);
  warningDiaryProof(sequelize);

  employeeAssociated();
  timeKeepingAssociated();
  onLeaveAssociated();
  warningDiaryProofAssociated();
};
