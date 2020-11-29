const express = require('express');
const asyncHandler = require('express-async-handler');
const { check, validationResult } = require('express-validator');

const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Task, User } = require('../../db/models');

const router = express.Router();

/****************** FIND TASKS **************************/

router.post(
  '/',
  asyncHandler(async (req, res, next) => {
    const { urlId } = req.body;
    let user = await User.findByPk(urlId)
    let helpType = user.dataValues.helpType;

    if (helpType) {
      help = 'helperId'
    } else {
      help = 'helpeeId'
    }
    let tasks = await Task.findAll({
      where: {
        [help]: urlId
      }
    })

    return res.json({
      tasks,
      helpType
    });
  }),
);

/****************** ADD TASK **************************/

router.post('/add', requireAuth, asyncHandler(async (req, res) => {
  const { choreType, taskDetails, id } = req.body;
  console.log("HERE WE GO", choreType, taskDetails, id)
  const userId = parseInt(id, 10)
    const task = Task.build({
      helpeeId: userId,
      details: taskDetails,
      category: choreType,
      completed: false,
    });

    const validateErrors = validationResult(req);

    console.log("TASK BEFORE VALIDATION", task);  
    if (validateErrors.isEmpty()) {
      await task.save();
      res.status(204).end()
      // return res.json({
      //   task
      // });
    } else {
      const errors = validateErrors.array().map(error => error.msg);
      return res.json({
        errors
      });
    }
}));

/****************** UPDATE TASK **************************/
  
  router.patch('/', requireAuth, asyncHandler(async (req, res) => {
    let { taskId, name, userId } = req.body
    const id = parseInt(taskId)
    const user = parseInt(userId)
    let task;
    if (!name) {
      task = await Task.update({ helperId: user }, {
        where: {
          id: id
        }
      });
    } else {
      task = await Task.update({ completed: true }, {
        where: {
          id: id
        }
      });
    }
      return res.json({
        task
      });
  }));


module.exports = router;