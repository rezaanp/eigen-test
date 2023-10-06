import { Op } from "sequelize";
import Member from "../model/member-model.js";

const get = async (req, res, next) => {
  try {
    const { pageIndex = 0, limit = 10, search = "" } = req.query;
    const offset = pageIndex * limit;

    const options = {
      attributes: ["uuid", "code", "name"],
      offset: offset,
      limit: parseInt(limit),
      where: {
        [Op.or]: [
          { code: { [Op.like]: `%${search}%` } },
          { name: { [Op.like]: `%${search}%` } },
        ],
      },
    };

    const members = await Member.findAll(options);
    const total = await Member.count({ where: options.where });
    const numberOfPages = Math.ceil(total / limit);

    res.json({
      total,
      pageIndex: Number(pageIndex),
      numberOfPages,
      data: members,
    });
  } catch (error) {
    next();
  }
};

export default { get };
