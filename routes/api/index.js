const router = require("express").Router();
const auth = require('../../middleware/auth');
const authRoute = require('./auth');
const usersRoute = require('./user');
const searchRoute = require('./search');
const reviewRoute = require('./review');

router.use('/auth', authRoute);
router.use("/user", auth.checkToken, usersRoute);
router.use("/profilemanagement", auth.checkToken, usersRoute);
router.use('/search', searchRoute);
router.use('/review', reviewRoute);

module.exports = router;