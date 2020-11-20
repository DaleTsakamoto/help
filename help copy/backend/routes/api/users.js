const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

/****************** SIGNUP **************************/

router.post(
  '',
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