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

// Retrieving the average rating of a book specified by its ID
booksRouter.get("/:id/notes", (req, res) => {
  // Retrieving the book id passed as a parameter
  const bookId = req.params.id;
  const book = books.find((book) => book.id == bookId);

  // Calculation of the average of the marks given
  const bookNotes = book["notes"];
  const sumNotes = bookNotes.reduce(
    (totalNotes, currentNote) => currentNote + totalNotes
  );
  const averageNotes = sumNotes / bookNotes.length;

  // Alert message
  const message = `Les notes du livre n°${bookId} ont été récupérées`;
  res.json(alert(message, averageNotes));
});

// Export.s
export { booksRouter };
