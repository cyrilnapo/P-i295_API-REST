const EditorModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "t_editor",
    {
      idEditor: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      ediName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [3, 15],
            msg: "Le nom de l'éditeur doit contenir entre 3 et 15 caractères.",
          },
          notNull: {
            msg: "Le champ nom est obligatoire.",
          },
        },
      },
    },
    {
      tableName: "t_editor",
      timestamp: false,
      createdAt: false,
      updatedAt: false,
    }
  );
};

export { EditorModel };
