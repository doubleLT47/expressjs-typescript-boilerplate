import Sequelize from "sequelize";
import employee, { employeeAssociated } from "./employee";

export default (sequelize: Sequelize.Sequelize): void => {
  employee(sequelize);

  employeeAssociated();
};
