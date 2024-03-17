const CategoryModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "t_category",
    {
      idCategory: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      catName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [3, 15],
            msg: "Le nom de la catégorie doit contenir entre 3 et 15 caractères.",
          },
          notNull: {
            msg: "Le champ nom est obligatoire.",
          },
        },
      },
    },
    {
      tableName: "t_category",
      timestamp: false,
      createdAt: false,
      updatedAt: false,
    }
  );
};

export { CategoryModel };
