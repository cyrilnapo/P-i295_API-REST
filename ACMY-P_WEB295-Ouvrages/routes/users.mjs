// Import.s
import express from "express";
import { User } from "../db/sequelize.mjs";
import { Book } from "../db/sequelize.mjs";

const usersRouter = express();

// Obtenir tous les livres d'un utilisateur
usersRouter.get("/:id/books", (req, res) => {
  Book.findAll({ where: { fkUser: req.params.id } })
    .then((users) => {
      if (users.length === 0) {
        const message = "Aucun livre trouvé pour cet utilisateur.";
        return res.status(404).json({ message });
      }
      const message = `Tous les livres dont l'utilisateur vaut ${req.params.id} ont été récupérés.`;
      res.json({ message, users });
    })
    .catch((error) => {
      const message =
        "Une erreur s'est produite lors de la récupération des livres pour cet utilisateur.";
      res.status(500).json({ message, error: error.message });
    });
});

// Export.s
export { usersRouter };
