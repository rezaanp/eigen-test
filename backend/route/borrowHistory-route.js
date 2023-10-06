import express from "express";
import borrowingHistory from "../controller/borrowHistory-controller.js";

const borrowingHistoryRouter = new express.Router();

borrowingHistoryRouter
  .route("/history/book/:bookId")
  .get(borrowingHistory.byBook);

borrowingHistoryRouter
  .route("/history/member/:memberId")
  .get(borrowingHistory.byMember);

export default borrowingHistoryRouter;
