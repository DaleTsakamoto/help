const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const searchRouter = require('./searchbar')
const peopleRouter = require('./people')

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/search', searchRouter);
router.use('/people', peopleRouter);


module.exports = router;
