// Import.s
import express from "express";
import { Author } from "../db/sequelize.mjs";
import { Book } from "../db/sequelize.mjs";

const authorsRouter = express();

// Obtenir tous les auteurs
authorsRouter.get("/", (req, res) => {
  Author.findAll()
    .then((author) => {
      const message = "La liste des auteurs a bien été récupérée.";
      res.json({ message, author });
    })
    .catch((error) => {
      const message =
        "La liste des auteurs n'a pas pu être récupérée. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});

// Obtenir un auteur
authorsRouter.get("/:id", (req, res) => {
  Author.findByPk(req.params.id)
    .then((author) => {
      if (author === null) {
        const message =
          "L'auteur demandé n'existe pas. Merci de réessayer avec un autre identifiant.";
        return res.status(404).json({ message });
      }
      const message = `L'auteur dont l'id vaut ${req.params.id} a bien été récupéré.`;
      res.json({ message, author });
    })
    .catch((error) => {
      const message =
        "L'auteur n'a pas pu être récupéré. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});

// Obtenir tous les livres d'un auteur
authorsRouter.get("/:id/books", (req, res) => {
  Book.findAll({ where: { fkAuthor: req.params.id } })
    .then((books) => {
      if (books.length === 0) {
        const message = "Aucun livre trouvé pour cet auteur.";
        return res.status(404).json({ message });
      }
      const message = `Tous les livres dont l'auteur vaut ${req.params.id} ont été récupérés.`;
      res.json({ message, books });
    })
    .catch((error) => {
      const message =
        "Une erreur s'est produite lors de la récupération des livres pour cet auteur.";
      res.status(500).json({ message, error: error.message });
    });
});

// Export.s
export { authorsRouter };
