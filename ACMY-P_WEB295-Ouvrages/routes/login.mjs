import express from "express";
import bcrypt from "bcrypt";
import { privateKey } from "../auth/private_key.mjs";
import jwt from "jsonwebtoken";
import { User } from "../db/sequelize.mjs";
const loginRouter = express();
loginRouter.post("/", (req, res) => {
  User.findOne({ where: { usePseudo: req.body.usePseudo } })
    .then((user) => {
      if (!user) {
        const message = `L'utilisateur demandé n'existe pas`;
        return res.status(404).json({ message });
      }
      bcrypt
        .compare(req.body.usePassword, user.usePassword)
        .then((isPasswordValid) => {
          if (!isPasswordValid) {
            const message = `Le mot de passe est incorrect.`;
            return res.status(401).json({ message });
          } else {
            // JWT
            const token = jwt.sign({ idUser: user.idUser }, privateKey, {
              expiresIn: "1y",
            });
            const message = `L'utilisateur a été connecté avec succès`;
            return res.json({ message, data: user, token });
          }
        });
    })
    .catch((error) => {
      const message = `L'utilisateur n'a pas pu être connecté. Réessayez dans quelques instants`;
      return res.json({ message, data: error });
    });
});

export { loginRouter };
