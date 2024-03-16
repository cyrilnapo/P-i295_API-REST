// Import.s
import express from "express";
import { alert } from "./alert.mjs";
import { Book } from "../db/sequelize.mjs";

const booksRouter = express();

// Récupération de tous les livres depuis la base de données
booksRouter.get("/", (req, res) => {
  Book.findAll()
    .then((books) => {
      const message = "La liste des produits a bien été récupérée.";
      res.json(alert(message, books));
    })
    .catch((error) => {
      const message =
        "La liste des produits n'a pas pu être récupérée. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});

// Récupération de tous les livres avec leur ID depuis la base de données
booksRouter.get("/:id", (req, res) => {
  Book.findByPk(req.params.id)
    .then((book) => {
      if (book === null) {
        const message =
          "Le produit demandé n'existe pas. Merci de réessayer avec un autre identifiant.";
        return res.status(404).json({ message });
      }
      const message = `Le livre dont l'id vaut ${req.params.id} a bien été récupéré.`;
      res.json(alert(message, book));
    })
    .catch((error) => {
      const message =
        "Le livre n'a pas pu être récupéré. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});

// Export.s
export { booksRouter };
