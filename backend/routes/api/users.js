const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const tasksRouter = require('./tasks')

const router = express.Router();

router.use('/:id/tasks', tasksRouter);


/****************** SIGNUP ERRORS MIDDLEWARE **************************/

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  check('helpType')
    .exists({ checkFalsy: true })
    .withMessage('Choose either helper or helpee'),
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('You must include a first name'),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('You must include a last name'),
  check('zipCode')
    .exists({ checkFalsy: true })
    .withMessage('You must include a zip code'),
  handleValidationErrors,
];

/****************** SIGNUP **************************/

router.post(
  '/',
  validateSignup,
  asyncHandler(async (req, res) => {
    const { username, email, password, helpType, firstName, lastName, avatar, bio, zipCode } = req.body;
    const user = await User.signup({ username, firstName, lastName, email, password, helpType, avatar, bio, zipCode });

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  }),
);

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