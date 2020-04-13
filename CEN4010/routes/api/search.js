const router = require('express').Router();
const search = require("../../controllers/search.js");


router.post("/getAllBooks", (req,res) => {
    search.getAllBooks(req.body, (status, data = "ok") => res.status(status).send(data));
});

module.exports = router;