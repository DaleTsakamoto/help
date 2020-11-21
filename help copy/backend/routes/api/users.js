const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();


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
  handleValidationErrors,
];

/****************** SIGNUP **************************/

router.post(
  '',
  validateSignup,
  asyncHandler(async (req, res) => {
    const { username, email, password, helpType, avatar, bio } = req.body;
    const user = await User.signup({ username, email, password, helpType, avatar, bio });

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  }),
);


module.exports = router;