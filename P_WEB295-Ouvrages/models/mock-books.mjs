import { DataTypes } from "sequelize";
import sequelize from "../db/sequelize.mjs";

const books = sequelize.define("Book", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Export
export { books };
