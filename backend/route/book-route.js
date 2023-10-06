import express from "express";
import bookController from "../controller/book-controller.js";

const bookRouter = new express.Router();

bookRouter.route("/books").get(bookController.get);

bookRouter.route("/book/borrow/:bookId/:memberId").post(bookController.borrow);

bookRouter
  .route("/book/return/:bookId/:memberId")
  .post(bookController.returnBook);

export default bookRouter;
