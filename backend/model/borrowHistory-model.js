import db from "../application/database.js";
import Book from "./book-model.js";
import Member from "./member-model.js";
import { DataTypes } from "sequelize";

const BorrowHistory = db.define("borrow_history", {
  uuid: {
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  bookId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  memberId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Book.hasMany(BorrowHistory, { foreignKey: "bookId" });
BorrowHistory.belongsTo(Book, { foreignKey: "bookId" });

Member.hasMany(BorrowHistory, { foreignKey: "memberId" });
BorrowHistory.belongsTo(Member, { foreignKey: "memberId" });

export default BorrowHistory;
