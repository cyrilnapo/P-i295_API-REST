// Import.s
import express from "express";
import { Category } from "../db/sequelize.mjs";
import { Book } from "../db/sequelize.mjs";

const categoriesRouter = express();

// Obtenir toutes les catégories
categoriesRouter.get("/", (req, res) => {
  Category.findAll()
    .then((categories) => {
      const message = "La liste des catégories a bien été récupérée.";
      res.json({ message, categories });
    })
    .catch((error) => {
      const message =
        "La liste des catégories n'a pas pu être récupérée. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});

// Obtenir une catégorie
categoriesRouter.get("/:id", (req, res) => {
  Category.findByPk(req.params.id)
    .then((categories) => {
      if (categories === null) {
        const message =
          "La catégorie demandé n'existe pas. Merci de réessayer avec un autre identifiant.";
        return res.status(404).json({ message });
      }
      const message = `La catégorie dont l'id vaut ${req.params.id} a bien été récupérée.`;
      res.json({ message, categories });
    })
    .catch((error) => {
      const message =
        "La catégorie n'a pas pu être récupérée. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});

// Obtenir tous les livres d'une catégorie
categoriesRouter.get("/:id/books", (req, res) => {
  Book.findAll({ where: { fkCategory: req.params.id } })
    .then((books) => {
      if (books.length === 0) {
        const message = "Aucun livre trouvé pour cette catégorie.";
        return res.status(404).json({ message });
      }
      const message = `Tous les livres dont la catégorie vaut ${req.params.id} ont été récupérés.`;
      res.json({ message, books });
    })
    .catch((error) => {
      const message =
        "Une erreur s'est produite lors de la récupération des livres pour cette catégorie.";
      res.status(500).json({ message, error: error.message });
    });
});

// Obtenir tous les livres d'un auteur
categoriesRouter.get("/:id/books", (req, res) => {
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
export { categoriesRouter };
