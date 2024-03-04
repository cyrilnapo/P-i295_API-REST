// Import.s
import express from "express";
import { booksRouter } from "../routes/books.mjs";

// Application declaration
const app = express();
app.use(express.json());

// Port
const port = 3000;

app.use("/api/books", booksRouter);

app.listen(port, () => {
  console.log(`L'application est lancée sur le port ${port}`);
});
