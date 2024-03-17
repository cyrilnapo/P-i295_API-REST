const RoleModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "t_role",
    {
      idRole: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      rolName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [3, 15],
            msg: "Le nom du rôle doit contenir entre 3 et 15 caractères.",
          },
          notNull: {
            msg: "Le champ nom est obligatoire.",
          },
        },
      },
    },
    {
      tableName: "t_role",
      timestamp: false,
      createdAt: false,
      updatedAt: false,
    }
  );
};

export { RoleModel };
