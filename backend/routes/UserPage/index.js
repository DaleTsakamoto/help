const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { User, Sequelize } = require('../../db/models');
const tasksRouter = require('./tasks.js');

// router.use('/tasks', tasksRouter);

/****************** USERS PAGE **************************/

router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
  const userId = parseInt(req.params.id, 10)
  const user = await User.findByPk(userId)
  if (user) {
    return res.json({
      user
    })
  }
    return res.json('No User Found!');
  }))

module.exports = router;