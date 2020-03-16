const router = require('express').Router();
const search = require("../../controllers/search.js");


router.post("/getSearchResults", (req,res) => {
    console.log('in routes api');
    console.log('in routes ' + req.body);
    search.getSearchResult(req.body, (status, data = "ok") => res.status(status).send(data));
});

module.exports = router;