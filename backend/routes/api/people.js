const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();



/****************** GET PEOPLE ************************/

// router.post(
//   '/',
//   asyncHandler(async (req, res) => {
//     const { username, email, password, helpType, firstName, lastName, avatar, bio, zipCode } = req.body;
//     const user = await User.signup({ username, firstName, lastName, email, password, helpType, avatar, bio, zipCode });

//     await setTokenCookie(res, user);

//     return res.json({
//       user,
//     });
//   }),
// );