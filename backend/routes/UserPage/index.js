const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { User, Sequelize } = require('../../db/models');

/****************** USERS PAGE **************************/

router.get('/', function (req, res) {
    res.send("Hello World!");
  })

module.exports = router;