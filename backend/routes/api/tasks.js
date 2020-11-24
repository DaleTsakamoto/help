const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

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

module.exports = router;