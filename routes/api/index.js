const router = require("express").Router();
const auth = require('../../middleware/auth');
const authRoute = require('./auth');
const usersRoute = require('./user');
const searchRoute = require('./search');

router.use('/auth', authRoute);
router.use("/user", auth.checkToken, usersRoute);
router.use('/search', searchRoute);


module.exports = router;