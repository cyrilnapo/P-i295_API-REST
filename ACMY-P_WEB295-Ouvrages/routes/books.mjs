// Import.s
import express from "express";
import { alert } from "./alert.mjs";
import { Book } from "../db/sequelize.mjs";
import { ValidationError } from "sequelize";

const booksRouter = express();

// Obtenir la liste des livres
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

// Obtenir un livre
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

// Ajouter un nouveau livre
booksRouter.post("/", (req, res) => {
  Book.create(req.body)
    .then((book) => {
      const message = `Le livre ${book.booTitle} a bien été créé !`;
      res.json({ message, book });
    })
    .catch((error) => {
      if (error instanceof ValidationError) {
        return res.status(400).json({ message: error.message, data: error });
      }
      const message =
        "Le livre n'a pas pu être ajouté. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});

// Modifier un livre
booksRouter.put("/:id", (req, res) => {
  const bookId = req.params.id;
  Book.update(req.body, { where: { idBook: bookId } })
    .then((_) => {
      Book.findByPk(bookId).then((book) => {
        if (book === null) {
          const message =
            "Le livre demandé n'existe pas. Merci de réessayer avec un autre identifiant.";
          return res.status(404).json({ message });
        }
        const message = `Le livre ${book.booTitle} dont l'id vaut ${book.idBook} a été mis à jour avec succès`;
        res.json({ message, book });
      });
    })
    .catch((error) => {
      const message =
        "Le livre n'a pas pu être mis à jour. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});

// Supprimer un livre
booksRouter.delete("/:id", (req, res) => {
  Book.findByPk(req.params.id)
    .then((book) => {
      if (book === null) {
        const message =
          "Le livre demandé n'existe pas. Merci de réessayer avec un autre identifiant.";
        return res.status(404).json({ message });
      }
      return Book.destroy({
        where: { idBook: book.idBook },
      }).then((_) => {
        const message = `Le produit ${book.booTitle} a bien été supprimé !`;
        res.json({ message, book });
      });
    })
    .catch((error) => {
      const message =
        "Le livre n'a pas pu être supprimé. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});

// Export.s
export { booksRouter };
