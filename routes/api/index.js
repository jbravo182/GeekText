const router = require("express").Router();
const auth = require('../../middleware/auth');
const authRoute = require('./auth');
const usersRoute = require('./user');
const searchRoute = require('./search');
const bookRoute = require('../book');

router.use('/auth', authRoute);
router.use("/user", auth.checkToken, usersRoute);
router.use("/profilemanagement", auth.checkToken, usersRoute);
router.use('/search', searchRoute);
router.use('/book', bookRoute);



module.exports = router;