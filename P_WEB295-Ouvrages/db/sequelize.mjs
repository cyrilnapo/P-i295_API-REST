import { Sequelize } from "sequelize";
const sequelize = new Sequelize(
  "db_PWEB295", // Nom de la DB qui doit exister
  "root", // Nom de l'utilisateur
  "root", // Mot de passe de l'utilisateur
  {
    host: "localhost",
    dialect: "mysql",
    logging: false,
  }
);
export { sequelize };
