// Import.s
import express from "express";
import { Rate } from "../db/sequelize.mjs";

const ratesRouter = express();

// Obtenir toutes les notes d'un livre
ratesRouter.get("/:id/rates", (req, res) => {
  Rate.findAll({ where: { fkBook: req.params.id } })
    .then((rates) => {
      if (rates.length === 0) {
        const message =
          "Aucune note trouvée pour ce livre. Veuillez vérifier l'identifiant du livre.";
        return res.status(404).json({ message });
      }
      const message = `Toutes les notes du livre n°${req.params.id} ont été récupérés.`;
      res.json({message,  rates });
    })
    .catch((error) => {
      const message =
        "Les rates n'ont pas pu être récupérées. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, error: error.message });
    });
});

// Export.s
export { ratesRouter };
