import db from "../application/database.js";
import Member from "./member-model.js";
import { DataTypes } from "sequelize";

const MemberPenalty = db.define(
  "members_penalty",
  {
    penaltyDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

MemberPenalty.belongsTo(Member, { foreignKey: "memberId" });

export default MemberPenalty;
