// Import.s
import express from "express";
import { books } from "../models/mock-books.mjs";
import { alert } from "./alert.mjs";

const booksRouter = express();

// Recovery of all books
booksRouter.get("/", (req, res) => {
  // Alert message
  const message = `Tous les livres ont été récupérés`;
  res.json(alert(message, books));
});

// Retrieving a book according to its ID
booksRouter.get("/:id", (req, res) => {
  // Retrieving the book id passed as a parameter
  const bookId = req.params.id;
  const book = books.find((book) => book.id == bookId);

  // Alert message
  const message = `Le livre n°${bookId} a été récupéré`;
  res.json(alert(message, book));
});

booksRouter.get("/:id/notes", (req, res) => {
  // Retrieving the book id passed as a parameter
  const bookId = req.params.id;
  const book = books.find((book) => book.bookId == bookId);

  // Check if the book exists
  if (!book) {
    const errorMessage = `Le livre n°${bookId} n'a pas été trouvé`;
    return res.json(alert(errorMessage, null));
  }

  // Check if 'notes' property exists on the book
  if (!book.notes) {
    const errorMessage = `Le livre n°${bookId} n'a pas de notes`;
    return res.json(alert(errorMessage, null));
  }

  // Calculation of the average of the marks given
  const bookNotes = book.notes;
  const sumNotes = bookNotes.reduce(
    (totalNotes, currentNote) => currentNote + totalNotes,
    0 // Provide an initial value to avoid errors with empty 'notes' array
  );
  const averageNotes = sumNotes / bookNotes.length;
  const roundedAverage = averageNotes.toFixed(2);

  // Alert message
  const message = `Les notes du livre n°${bookId} ont été récupérées`;
  res.json(alert(message, roundedAverage));
});


booksRouter.post("/", async (req, res) => {
  try {
    const bookData = {
      booTitle: req.body.booTitle,
      booNbPages: req.body.booNbPages,
      // Ajoutez d'autres champs selon votre modèle
      booImagecover: req.body.booImagecover,
    };

    const createdBook = await Book.create(bookData);

    const message = `Le livre ${createdBook.booTitle} a bien été créé !`;
    res.json(success(message, createdBook));
  } catch (error) {
    if (error instanceof ValidationError) {
      const message = error.errors.map((e) => e.message).join(", ");
      return res.status(400).json({ message, data: error });
    }

    const message =
      "Le livre n'a pas pu être ajouté. Merci de réessayer dans quelques instants.";
    res.status(500).json({ message, data: error });
  }
});

booksRouter.post("/:id/comments", (req, res) => {
  const bookId = req.params.id;

  const commentData = {
    content: req.body.content,
  };

  Comment.create(commentData)
    .then((createdComment) => {
      return Book.findByPk(bookId, { include: Comment });
    })
    .then((bookWithComments) => {
      if (!bookWithComments) {
        const message =
          "Le livre demandé n'existe pas. Merci de réessayer avec un autre identifiant.";
        return res.status(404).json({ message });
      }

      return bookWithComments.addComment(createdComment);
    })
    .then(() => {
      const message = `Le commentaire a bien été ajouté au livre ${bookWithComments.booTitle} !`;
      res.json(success(message, createdComment));
    })
    .catch((error) => {
      const message =
        "Une erreur est survenue. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});

// Export.s
export { booksRouter };
