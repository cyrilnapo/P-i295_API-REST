// Import.s
import express from "express";
import { Comment } from "../db/sequelize.mjs";

const commentsRouter = express();

// Obtenir tous les commentaires d'un livre
commentsRouter.get("/:id/comments", (req, res) => {
  Comment.findAll({ where: { fkBook: req.params.id } })
    .then((comments) => {
      if (comments.length === 0) {
        const message =
          "Aucun commentaire trouvé pour ce livre. Veuillez vérifier l'identifiant du livre.";
        return res.status(404).json({ message });
      }
      const message = `Tous les commentaires du livre n°${req.params.id} ont été récupérés.`;
      res.json({ message, comments });
    })
    .catch((error) => {
      const message =
        "Les commentaires n'ont pas pu être récupérés. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, error: error.message });
    });
});

// Export.s
export { commentsRouter };
