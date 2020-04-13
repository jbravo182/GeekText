const router = require("express").Router();
const auth = require('../../middleware/auth');
const authRoute = require('./auth');
const usersRoute = require('./user');
const searchRoute = require('./search');
const authorRouter = require('./authors');
const bookreviewRouter = require('./bookreviews');
const booksRouter = require('./books');

router.use('/auth', authRoute);
router.use("/user", auth.checkToken, usersRoute);
router.use("/profilemanagement", auth.checkToken, usersRoute);
router.use('/search', searchRoute);
router.use('/books', booksRouter);
router.use('/authors', authorRouter);
router.use('/bookreviews', bookreviewRouter);



module.exports = router;