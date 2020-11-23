const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, Task } = require('../../db/models');

const router = express.Router();

/****************** TASKS ERRORS MIDDLEWARE ***********************/




/****************** TASKS ROUTES ***********************/

router.get('/', (req, res) => {
  
})