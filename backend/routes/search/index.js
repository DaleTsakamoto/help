const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { User } = require('../../db/models');

/****************** SEARCH DATABASE **************************/

router.post(
  '/',
  asyncHandler(async (req, res, next) => {
    const { keyword } = req.body;

    let users = await User.findAll({
      where: {
        title: {
          // [Sequelize.Op.iLike]: '%'+keyword+'%'
          [Sequelize.Op.iLike]: keyword
        },
      }
    })

    if (!users) {
      const err = new Error('No matches found');
      err.status = 401;
      err.title = 'No Matches';
      err.errors = ['No matches were found.'];
      return next(err);
    }

    return res.json({
      users,
    });
  }),
);

module.exports = router;