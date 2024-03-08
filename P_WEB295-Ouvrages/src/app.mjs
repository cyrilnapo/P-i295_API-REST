// Import.s
import express from "express";
import sequelize from "../db/sequelize.mjs";
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

sequelize
  .authenticate()
  .then((_) =>
    console.log("La connexion à la base de données a bien été établie")
  )
  .catch((error) => console.error("Impossible de se connecter à la DB"));

sequelize
  .sync()
  .then(() => {
    console.log("La base de données à été syncronisée");
  })
  .catch((error) => {
    console.error("Error La base de données n'à pas été syncronisée:", error);
  });
