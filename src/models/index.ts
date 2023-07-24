import Sequelize from "sequelize";
import user from "./user";

export default (sequelize: Sequelize.Sequelize): void => {
  user(sequelize);
};
