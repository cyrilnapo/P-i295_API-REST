const AuthorModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "t_author",
    {
      idAuthor: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      autName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [3, 15],
            msg: "Le nom de l'auteur doit contenir entre 3 et 15 caractères.",
          },
          notNull: {
            msg: "Le champ nom est obligatoire.",
          },
        },
      },
      autSurname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [3, 15],
            msg: "Le nom de famille de l'auteur doit contenir entre 3 et 15 caractères.",
          },
          notNull: {
            msg: "Le champ nom est obligatoire.",
          },
        },
      },
    },
    {
      tableName: "t_author",
      timestamp: false,
      createdAt: false,
      updatedAt: false,
    }
  );
};

export { AuthorModel };
