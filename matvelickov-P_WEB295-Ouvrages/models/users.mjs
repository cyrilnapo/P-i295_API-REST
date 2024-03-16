const UserModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "t_user",
    {
      idUser: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      usePseudo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [5, 15],
            msg: "Le nom d'utilisateur doit contenir entre 5 et 15 caractères.",
          },
          notNull: {
            msg: "Le nom d'utilisateur est un champ obligatoire.",
          },
        },
      },
      usePassword: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [8, 20],
            msg: "Le mot de passe doit contenir entre 8 et 20 caractères.",
          },
          notNull: {
            msg: "Le mot de passe est un champ obligatoire.",
          },
        },
      },
      fkRole: {
        type: DataTypes.INTEGER,
        references: {
          model: "t_role",
          key: "idRole",
        },
        onDelete: "no action",
      },
    },
    {
      tableName: "t_user",
      timestamp: false,
      createdAt: false,
      updatedAt: false,
    }
  );
};

export { UserModel };
