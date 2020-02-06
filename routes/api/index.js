const router = require("express").Router();
const usersRoute = require('./user');

router.use("/profile_management", usersRoute);


module.exports = router;