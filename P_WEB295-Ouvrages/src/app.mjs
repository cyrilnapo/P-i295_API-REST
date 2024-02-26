// Importation d'express
import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Ouvrages !");
});

app.listen(port, () => {
  console.log(`L'application est lancée sur le port ${port}`);
});
