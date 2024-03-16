// Import.s
import express from "express";
import { booksRouter } from "../routes/books.mjs";
import { sequelize } from "../db/sequelize.mjs";
import { initDatabase } from "../db/sequelize.mjs";

// Application declaration
const app = express();
app.use(express.json());

// Port
const port = 3000;

sequelize
  .authenticate()
  .then((_) =>
    console.log("La connexion à la base de donéées a bien été établie")
  )
  .catch((error) => console.error("Impossible de se connecter à la DB"));
initDatabase();

app.use("/api/books", booksRouter);

app.listen(port, () => {
  console.log(`L'application est lancée sur le port ${port}`);
});