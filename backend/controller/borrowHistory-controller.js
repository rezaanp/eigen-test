import Book from "../model/book-model.js";
import Member from "../model/member-model.js";
import BorrowHistory from "../model/borrowHistory-model.js";

const byBook = async (req, res, next) => {
  try {
    const { bookId } = req.params;

    const book = await Book.findOne({ where: { uuid: bookId } });
    if (!book) return res.status(404).json({ message: "Book Not Found" });

    const options = {
      attributes: ["isActive", "createdAt", "updatedAt"],
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: Book,
          attributes: ["uuid", ["code", "bookCode"], "title", "author"],
        },
        {
          model: Member,
          attributes: ["uuid", ["code", "memberCode"], "name"],
        },
      ],
      where: { bookId: book?.id },
    };

    const history = await BorrowHistory.findAll(options);
    res.json(history);
  } catch (error) {
    next();
  }
};

const byMember = async (req, res, next) => {
  try {
    const { memberId } = req.params;

    const member = await Member.findOne({ where: { uuid: memberId } });
    if (!member) return res.status(404).json({ message: "Member Not Found" });

    const options = {
      attributes: ["isActive", "createdAt", "updatedAt"],
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: Book,
          attributes: [["code", "bookCode"], "title", "author"],
        },
        {
          model: Member,
          attributes: [["code", "memberCode"], "name"],
        },
      ],
      where: { memberId: member?.id },
    };

    const history = await BorrowHistory.findAll(options);
    res.json(history);
  } catch (error) {
    next();
  }
};

export default { byBook, byMember };
