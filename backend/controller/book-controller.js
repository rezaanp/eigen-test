import { Op, Sequelize } from "sequelize";
import Book from "../model/book-model.js";
import Member from "../model/member-model.js";
import MemberPenalty from "../model/memberPenalty-model.js";
import BorrowHistory from "../model/borrowHistory-model.js";

const get = async (req, res, next) => {
  try {
    const { pageIndex = 0, limit = 10, search = "" } = req.query;
    const offset = pageIndex * limit;

    const options = {
      attributes: ["uuid", "code", "title", "author", "stock"],
      offset: offset,
      limit: parseInt(limit),
      where: {
        [Op.or]: [
          { code: { [Op.like]: `%${search}%` } },
          { title: { [Op.like]: `%${search}%` } },
        ],
      },
    };

    const books = await Book.findAll(options);
    const total = await Book.count({ where: options.where });
    const numberOfPages = Math.ceil(total / limit);

    res.json({
      total,
      pageIndex: Number(pageIndex),
      numberOfPages,
      data: books,
    });
  } catch (error) {
    next();
  }
};

const borrow = async (req, res, next) => {
  try {
    const { bookId, memberId } = req.params;

    const book = await Book.findOne({ where: { uuid: bookId } });
    if (!book) return res.status(404).json({ message: "Book Not Found" });

    const member = await Member.findOne({ where: { uuid: memberId } });
    if (!member) return res.status(404).json({ message: "Member Not Found" });

    const bookHasStock = book?.stock > 0;
    if (!bookHasStock)
      return res.status(409).json({ message: "Book Out Of Stock" });

    const userHasBorrowed = await checkUserHasBorrowed(member?.id);
    if (userHasBorrowed)
      return res.status(422).json({ message: "User Have Active Borrow" });

    const userIsPenalty = await checkUserIsPenalty(member?.id);
    if (userIsPenalty)
      return res.status(422).json({ message: "User Are Penalized" });

    //UPDATE STOCK BOOK AND ADD HISTORY
    await addBorrowHistory(book?.id, member?.id);
    await updateBookStock(bookId, "-");

    res.json({ message: "Success Borrow" });
  } catch (error) {
    next();
  }
};

const returnBook = async (req, res, next) => {
  try {
    const { bookId, memberId } = req.params; //GET UUID

    const book = await Book.findOne({ where: { uuid: bookId } });
    if (!book) return res.status(404).json({ message: "Book Not Found" });

    const member = await Member.findOne({ where: { uuid: memberId } });
    if (!member) return res.status(404).json({ message: "Member Not Found" });

    const borrowHistory = await BorrowHistory.findOne({
      where: { bookId: book?.id, memberId: member?.id, isActive: true },
    });

    if (!borrowHistory)
      return res
        .status(404)
        .json({ message: "The Member No Longer Has An Active Borrowed" });

    await checkPenaltyAndUpdateStatus(borrowHistory, member?.id);
    await updateBookStock(bookId, "+");

    res.json({ message: "Success Return Book" });
  } catch (error) {
    next();
  }
};

//FUNCTIONS
const checkUserHasBorrowed = async (memberId) => {
  const result = await BorrowHistory.findOne({
    where: {
      isActive: true,
      memberId,
    },
  });

  return Boolean(result);
};

const checkUserIsPenalty = async (memberId) => {
  const result = await MemberPenalty.findOne({
    where: {
      memberId,
    },
  });

  if (result?.penaltyDate) {
    const penaltyDate = new Date(result?.penaltyDate);
    const currentDate = new Date();
    penaltyDate.setDate(penaltyDate.getDate() + 3);

    if (penaltyDate >= currentDate) return true;
    return false;
  } else {
    return false;
  }
};

const updateBookStock = async (bookId, operator) => {
  await Book.update(
    {
      stock: Sequelize.literal(`stock ${operator} 1`),
    },
    {
      where: {
        uuid: bookId,
      },
    }
  );
};

const addBorrowHistory = async (bookId, memberId) => {
  await BorrowHistory.create({
    isActive: true,
    bookId,
    memberId,
  });
};

const checkPenaltyAndUpdateStatus = async (borrowHistory, memberId) => {
  const currentDate = new Date();
  const returnDeadline = new Date(borrowHistory?.createdAt);
  returnDeadline.setDate(returnDeadline.getDate() + 7);

  borrowHistory.isActive = false;
  await borrowHistory.save();

  if (currentDate >= returnDeadline) {
    await MemberPenalty.create({
      memberId,
      penaltyDate: Sequelize.literal("CURRENT_TIMESTAMP"),
    });
    return true;
  } else {
    return false;
  }
};

export default { get, borrow, returnBook };
