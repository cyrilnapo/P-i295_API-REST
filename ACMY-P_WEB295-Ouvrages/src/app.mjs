// Import.s
import express from "express";
import { booksRouter } from "../routes/books.mjs";
import { commentsRouter } from "../routes/comments.mjs";
import { sequelize } from "../db/sequelize.mjs";
import { initDatabase } from "../db/sequelize.mjs";
import { ratesRouter } from "../routes/notes.mjs";
import { categoriesRouter } from "../routes/categories.mjs";
import { authorsRouter } from "../routes/authors.mjs";
import { usersRouter } from "../routes/users.mjs";
import { loginRouter } from "../routes/login.mjs";

// Application declaration
const app = express();
app.use(express.json());

// Port
const port = 3000;

sequelize
  .authenticate()
  .then((_) => console.log(" ✓ Database connexion"))
  .catch((error) => console.error(" X Database connexion"));
initDatabase();

app.use("/api/books", booksRouter);
app.use("/api/books", commentsRouter);
app.use("/api/books", ratesRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/authors", authorsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

app.listen(port, () => {
  console.log(`En cours - Port ${port}`);
});

// Erreur 404 si l'URL n'existe pas
app.use(({ res }) => {
  const message = "Impossible d'accéder à l'URL demandée ! Veuillez réessayer.";
  res.status(404).json(message);
});
