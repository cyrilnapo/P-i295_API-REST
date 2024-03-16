const RateModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "t_rate",
    {
      fkBook: {
        type: DataTypes.INTEGER,
        references: {
          model: "t_book",
          key: "idBook",
        },
        onDelete: "no action",
      },
      fkUser: {
        type: DataTypes.INTEGER,
        references: {
          model: "t_user",
          key: "idUser",
        },
        onDelete: "no action",
      },
      ratRate: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
        validate: {
          min: {
            args: [1.0],
            msg: "La note doit être supérieure ou égale à 1",
          },
          max: {
            args: [10.0],
            msg: "La note doit être inférieure ou égale à 10",
          },
          notNull: {
            msg: "La note du livre est un champ obligatoire.",
          },
        },
      },
    },
    {
      tableName: "t_rate",
      timestamp: false,
      createdAt: false,
      updatedAt: false,
    }
  );
};

export { RateModel };
