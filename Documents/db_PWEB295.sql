-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : db:3306
-- Généré le : lun. 04 mars 2024 à 07:15
-- Version du serveur : 8.0.30
-- Version de PHP : 8.0.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `db_PWEB295`
--

-- --------------------------------------------------------

--
-- Structure de la table `comments`
--

CREATE TABLE `comments` (
  `fkBook` int NOT NULL,
  `fkUser` int NOT NULL,
  `comment` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `rate`
--

CREATE TABLE `rate` (
  `fkBook` int NOT NULL,
  `fkUser` int NOT NULL,
  `rating` decimal(15,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `t_autor`
--

CREATE TABLE `t_autor` (
  `idAutor` int NOT NULL,
  `autName` varchar(50) DEFAULT NULL,
  `autSurname` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `t_book`
--

CREATE TABLE `t_book` (
  `idBook` int NOT NULL,
  `booTitle` varchar(50) DEFAULT NULL,
  `booNbPages` int DEFAULT NULL,
  `booExtract` varchar(50) DEFAULT NULL,
  `booSummary` varchar(50) DEFAULT NULL,
  `booEditionYear` int DEFAULT NULL,
  `booAverageRating` decimal(15,2) DEFAULT NULL,
  `booImageCover` varchar(50) DEFAULT NULL,
  `fkUser` int NOT NULL,
  `fkAutor` int NOT NULL,
  `fkEditor` int NOT NULL,
  `fkCategory` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `t_category`
--

CREATE TABLE `t_category` (
  `idCategory` int NOT NULL,
  `catName` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `t_editor`
--

CREATE TABLE `t_editor` (
  `idEditor` int NOT NULL,
  `ediName` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `t_role`
--

CREATE TABLE `t_role` (
  `idRole` int NOT NULL,
  `rolName` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `t_user`
--

CREATE TABLE `t_user` (
  `idUser` int NOT NULL,
  `usePseudo` varchar(50) DEFAULT NULL,
  `useEntryDate` date DEFAULT NULL,
  `useNbBooksInputs` int DEFAULT NULL,
  `useNbAppreciations` int DEFAULT NULL,
  `useNbComments` int DEFAULT NULL,
  `fkRole` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`fkBook`,`fkUser`),
  ADD KEY `fkUser` (`fkUser`);

--
-- Index pour la table `rate`
--
ALTER TABLE `rate`
  ADD PRIMARY KEY (`fkBook`,`fkUser`),
  ADD KEY `fkUser` (`fkUser`);

--
-- Index pour la table `t_autor`
--
ALTER TABLE `t_autor`
  ADD PRIMARY KEY (`idAutor`);

--
-- Index pour la table `t_book`
--
ALTER TABLE `t_book`
  ADD PRIMARY KEY (`idBook`),
  ADD KEY `fkUser` (`fkUser`),
  ADD KEY `fkAutor` (`fkAutor`),
  ADD KEY `fkEditor` (`fkEditor`),
  ADD KEY `fkCategory` (`fkCategory`);

--
-- Index pour la table `t_category`
--
ALTER TABLE `t_category`
  ADD PRIMARY KEY (`idCategory`);

--
-- Index pour la table `t_editor`
--
ALTER TABLE `t_editor`
  ADD PRIMARY KEY (`idEditor`);

--
-- Index pour la table `t_role`
--
ALTER TABLE `t_role`
  ADD PRIMARY KEY (`idRole`);

--
-- Index pour la table `t_user`
--
ALTER TABLE `t_user`
  ADD PRIMARY KEY (`idUser`),
  ADD KEY `fkRole` (`fkRole`);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`fkBook`) REFERENCES `t_book` (`idBook`),
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`fkUser`) REFERENCES `t_user` (`idUser`);

--
-- Contraintes pour la table `rate`
--
ALTER TABLE `rate`
  ADD CONSTRAINT `rate_ibfk_1` FOREIGN KEY (`fkBook`) REFERENCES `t_book` (`idBook`),
  ADD CONSTRAINT `rate_ibfk_2` FOREIGN KEY (`fkUser`) REFERENCES `t_user` (`idUser`);

--
-- Contraintes pour la table `t_book`
--
ALTER TABLE `t_book`
  ADD CONSTRAINT `t_book_ibfk_1` FOREIGN KEY (`fkUser`) REFERENCES `t_user` (`idUser`),
  ADD CONSTRAINT `t_book_ibfk_2` FOREIGN KEY (`fkAutor`) REFERENCES `t_autor` (`idAutor`),
  ADD CONSTRAINT `t_book_ibfk_3` FOREIGN KEY (`fkEditor`) REFERENCES `t_editor` (`idEditor`),
  ADD CONSTRAINT `t_book_ibfk_4` FOREIGN KEY (`fkCategory`) REFERENCES `t_category` (`idCategory`);

--
-- Contraintes pour la table `t_user`
--
ALTER TABLE `t_user`
  ADD CONSTRAINT `t_user_ibfk_1` FOREIGN KEY (`fkRole`) REFERENCES `t_role` (`idRole`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
