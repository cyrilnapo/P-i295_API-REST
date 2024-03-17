import { Sequelize, DataTypes } from "sequelize";

import { CategoryModel } from "../models/categorys.mjs";
import { categorys } from "../models/mock-categorys.mjs";
import { RoleModel } from "../models/roles.mjs";
import { roles } from "../models/mock-roles.mjs";
import { EditorModel } from "../models/editors.mjs";
import { editors } from "../models/mock-editors.mjs";
import { AuthorModel } from "../models/authors.mjs";
import { authors } from "../models/mock-authors.mjs";
import { UserModel } from "../models/users.mjs";
import { users } from "../models/mock-users.mjs";
import { BookModel } from "../models/books.mjs";
import { books } from "../models/mock-books.mjs";
import { RateModel } from "../models/rates.mjs";
import { rates } from "../models/mock-rates.mjs";
import { CommentModel } from "../models/comments.mjs";
import { comments } from "../models/mock-comments.mjs";

const sequelize = new Sequelize("db_PWEB295", "root", "root", {
  host: "localhost",
  port: "6033",
  dialect: "mysql",
  logging: false,
});

let initDatabase = () => {
  return sequelize
    .sync({ force: true }) // Force la synchro => donc supprime les données également
    .then((_) => {
      console.log(" ✓ Database synchronization");
      importCategory();
      importRole();
      importEditor();
      importAuthor();
      importUser();
      importBook();
      importRate();
      importComment();
    });
};

// Synchronisation des catégories
const Category = CategoryModel(sequelize, DataTypes);
const importCategory = () => {
  categorys.map((category) => {
    Category.create({
      idCategory: category.categoryId,
      catName: category.name,
    }); // .then((category) => console.log(category.toJSON()));
  });
};

// Synchronisation des roles
const Role = RoleModel(sequelize, DataTypes);
const importRole = () => {
  roles.map((role) => {
    Role.create({
      idRole: role.roleId,
      rolName: role.name,
    }); // .then((role) => console.log(role.toJSON()));
  });
};

// Synchronisation des editeurs
const Editor = EditorModel(sequelize, DataTypes);
const importEditor = () => {
  editors.map((editor) => {
    Editor.create({
      idEditor: editor.roleId,
      ediName: editor.name,
    }); // .then((editor) => console.log(editor.toJSON()));
  });
};

// Synchronisation des authors
const Author = AuthorModel(sequelize, DataTypes);
const importAuthor = () => {
  authors.map((author) => {
    Author.create({
      idAuthor: author.authorId,
      autName: author.name,
      autSurname: author.surname,
    }); // .then((author) => console.log(author.toJSON()));
  });
};

// Synchronisation des users
const User = UserModel(sequelize, DataTypes);
const importUser = () => {
  users.map((user) => {
    User.create({
      idUser: user.userId,
      usePseudo: user.pseudo,
      usePassword: user.password,
      fkRole: user.fkRole,
    }); // .then((user) => console.log(user.toJSON()));
  });
};

// Synchronisation des books
const Book = BookModel(sequelize, DataTypes);
const importBook = () => {
  books.map((book) => {
    Book.create({
      idBook: book.bookId,
      booTitle: book.titre,
      booNbPages: book.count_pages,
      booExtract: book.plot,
      booSummary: book.summary,
      booEditionYear: book.publication_year,
      booAverageRating: book.notes,
      booImageCover: book.cover_image,
      fkUser: book.fkUser,
      fkAuthor: book.fkAuthor,
      fkEditor: book.fkEditor,
      fkCategory: book.fkCategory,
    }); // .then((book) => console.log(book.toJSON()));
  });
};

// Synchronisation des rates
const Rate = RateModel(sequelize, DataTypes);
const importRate = () => {
  rates.map((rate) => {
    Rate.create({
      fkBook: rate.fkBook,
      fkUser: rate.fkUser,
      ratRate: rate.rate,
    }); // .then((rate) => console.log(rate.toJSON()));
  });
};

// Synchronisation des comments
const Comment = CommentModel(sequelize, DataTypes);
const importComment = () => {
  comments.map((comment) => {
    Comment.create({
      fkBook: comment.fkBook,
      fkUser: comment.fkUser,
      comComment: comment.comment,
    }); // .then((comment) => console.log(comment.toJSON()));
  });
};

export {
  sequelize,
  initDatabase,
  Category,
  Role,
  Editor,
  Author,
  User,
  Book,
  Rate,
  Comment,
};
