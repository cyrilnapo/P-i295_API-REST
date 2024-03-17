const BookModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "t_book",
    {
      idBook: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      booTitle: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [3, 15],
            msg: "Le titre du livre doit contenir entre 3 et 15 caractères.",
          },
          notNull: {
            msg: "Le titre du livre est un champ obligatoire.",
          },
        },
      },
      booNbPages: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          min: {
            args: [1],
            msg: "Le nombre de pages doit être supérieur ou égal à 1",
          },
          max: {
            args: [10000],
            msg: "Le nombre de pages doit être inférieur ou égal à 10'000",
          },
        },
      },
      booExtract: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      booSummary: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Le sommaire du livre est un champ obligatoire.",
          },
        },
      },
      booEditionYear: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "L'année d'édition est un champ obligatoire.",
          },
        },
      },
      booAverageRating: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
        validate: {
          notNull: {
            msg: "La note moyenne est un champ obligatoire.",
          },
        },
      },
      booImageCover: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      fkUser: {
        type: DataTypes.INTEGER,
        references: {
          model: "t_user",
          key: "idUser",
        },
        onDelete: "cascade",
      },
      fkAuthor: {
        type: DataTypes.INTEGER,
        references: {
          model: "t_author",
          key: "idAuthor",
        },
        onDelete: "cascade",
      },
      fkEditor: {
        type: DataTypes.INTEGER,
        references: {
          model: "t_editor",
          key: "idEditor",
        },
        onDelete: "cascade",
      },
      fkCategory: {
        type: DataTypes.INTEGER,
        references: {
          model: "t_category",
          key: "idCategory",
        },
        onDelete: "cascade",
      },
    },
    {
      tableName: "t_book",
      timestamp: false,
      createdAt: false,
      updatedAt: false,
    }
  );
};

export { BookModel };
