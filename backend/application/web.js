import express from "express";
// import db from "./database.js";
import cors from "cors";
import bookRouter from "../route/book-route.js";
import memberRouter from "../route/member-route.js";
import borrowingHistoryRouter from "../route/borrowHistory-route.js";
import errorMiddleware from "../middleware/error-middleware.js";

// SYNC DB
// (async () => {
//   await db.sync();
// })();

const web = express();
web
  .use(cors({ credentials: true, origin: "http://localhost:3000" }))
  .use(express.json())
  .use(bookRouter)
  .use(memberRouter)
  .use(borrowingHistoryRouter)
  .use(errorMiddleware);

export default web;
