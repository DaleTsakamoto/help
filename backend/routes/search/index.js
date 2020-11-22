const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { User, Sequelize } = require('../../db/models');

/****************** SEARCH DATABASE **************************/

router.post(
  '/',
  asyncHandler(async (req, res, next) => {
    const { keywordSearch } = req.body;
    let users;
    if (keywordSearch.includes(' ')) {
      const keywordArr = keywordSearch.split(' ')
      console.log(keywordArr)
    }
    users = await User.findAll({
      where: {
        username: {
          [Sequelize.Op.iLike]: '%'+keywordSearch+'%'
        },
      }
    })

    if (users.length === 0) {
      users.push("Search returned 0 results")
    }

    return res.json({
      users,
    });
  }),
);

module.exports = router;