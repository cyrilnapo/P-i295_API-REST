const CommentModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "t_comment",
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
      comComment: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [10, 100],
            msg: "Le commentaire doit contenir entre 10 et 100 caractères.",
          },
          notNull: {
            msg: "Le commentaire du livre est un champ obligatoire.",
          },
        },
      },
    },
    {
      tableName: "t_comment",
      timestamp: false,
      createdAt: false,
      updatedAt: false,
    }
  );
};

export { CommentModel };
