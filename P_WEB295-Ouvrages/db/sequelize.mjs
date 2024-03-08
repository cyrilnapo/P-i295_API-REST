import { Sequelize } from "sequelize";
const sequelize = new Sequelize("db_PWEB295", "root", "root", {
  host: "localhost",
  port: 6033,
  dialect: "mysql",
  logging: false,
});
export { sequelize };
