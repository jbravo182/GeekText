const router = require('express').Router();
const search = require("../../controllers/search");


router.post("/getSearchResults", (req,res) => {
    search.getSearchResult(req.body, (status, data = "ok") => res.status(status).send(data));
});

module.exports = router;