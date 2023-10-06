import express from "express";
import memberController from "../controller/member-controller.js";

const memberRouter = new express.Router();

memberRouter
  .route("/members")
  .get(memberController.get)
  .post(memberController.add);

export default memberRouter;
