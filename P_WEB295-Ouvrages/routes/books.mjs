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

// Export.s
export { booksRouter };
