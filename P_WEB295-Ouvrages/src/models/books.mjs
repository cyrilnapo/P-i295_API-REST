const bookModel = (sequelize, DataTypes) => {
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
        unique: {
          msg: "Ce nom est déjà pris.",
        },
        validate: {
          is: {
            args: /^[A-Za-z\s]*$/,
            msg: "Seules les lettres et les espaces sont autorisés.",
          },
          notEmpty: {
            msg: "Le nom ne peut pas être vide.",
          },
          notNull: {
            msg: "Le nom est une propriété obligatoire.",
          },
        },
      },
      booNbPages: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          is: {
            args: /^\d*$/,
            msg: "Seules les chiffres sont autorisés.",
          },
          notEmpty: {
            msg: "Le nombre de page ne peut pas être vide.",
          },
          notNull: {
            msg: "Le nombre de page est une propriété obligatoire.",
          },
        },
      },
      booExtract: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: {
            args: /^[A-Za-z\s]*$/,
            msg: "Seules les lettres et les espaces sont autorisés.",
          },
          notEmpty: {
            msg: "L'extrait ne peut pas être vide.",
          },
          notNull: {
            msg: "L'extrait est une propriété obligatoire.",
          },
        },
      },
      booSummary: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: {
            args: /^[A-Za-z\s]*$/,
            msg: "Seules les lettres et les espaces sont autorisés.",
          },
          notEmpty: {
            msg: "L'extrait ne peut pas être vide.",
          },
          notNull: {
            msg: "L'extrait est une propriété obligatoire.",
          },
        },
      },
      booEditionYear: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          is: {
            args: /^\d*$/,
            msg: "Seules les chiffres sont autorisés.",
          },
          notEmpty: {
            msg: "L'année d'édition ne peut pas être vide.",
          },
          notNull: {
            msg: "L'année d'édition est une propriété obligatoire.",
          },
        },
      },
      booAverageRating: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          is: {
            args: /^\d*$/,
            msg: "Seules les chiffres sont autorisés.",
          },
          notEmpty: {
            msg: "L'année d'édition ne peut pas être vide.",
          },
          notNull: {
            msg: "L'année d'édition est une propriété obligatoire.",
          },
        },
      },
      booImagecover: {
        type: DataTypes.BLOB,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "L'année d'édition ne peut pas être vide.",
          },
          notNull: {
            msg: "L'année d'édition est une propriété obligatoire.",
          },
        },
      },
    },
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: false,
    }
  );
};
const userModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "t_user",
    {
      idUser: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      usePseudo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Ce nom d'utilisateur est déjà pris.",
        },
        validate: {
          is: {
            args: /^[A-Za-z0-9_]*$/,
            msg: "Seuls les lettres, chiffres et underscores sont autorisés dans le nom d'utilisateur.",
          },
          notEmpty: {
            msg: "Le nom d'utilisateur ne peut pas être vide.",
          },
          notNull: {
            msg: "Le nom d'utilisateur est une propriété obligatoire.",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Cet e-mail est déjà utilisé.",
        },
        validate: {
          isEmail: {
            msg: "Veuillez entrer une adresse e-mail valide.",
          },
          notEmpty: {
            msg: "L'e-mail ne peut pas être vide.",
          },
          notNull: {
            msg: "L'e-mail est une propriété obligatoire.",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Le mot de passe ne peut pas être vide.",
          },
          notNull: {
            msg: "Le mot de passe est une propriété obligatoire.",
          },
        },
      },
      bookId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "t_Role",
          key: "idRole",
        },
        onDelete: "CASCADE",
      },
    },
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: false,
    }
  );
};

userModel;

export { bookModel, userModel };
