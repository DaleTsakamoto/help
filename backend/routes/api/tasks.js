const express = require('express');
const asyncHandler = require('express-async-handler');
const { check, validationResult } = require('express-validator');

const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Task } = require('../../db/models');

const router = express.Router();

/****************** TASKS PAGE **************************/

router.post(
  '/',
  asyncHandler(async (req, res, next) => {
    const { helpType, id } = req.body;
    let help;
    if (helpType) {
      help = 'helperId'
    } else {
      help = 'helpeeId'
    }
    let tasks = await Task.findAll({
      where: {
        [help]: id
      }
    })

    return res.json({
      tasks,
      help
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

    console.log("WE DID IT", task);  
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

module.exports = router;