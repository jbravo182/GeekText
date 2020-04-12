const router = require('express').Router();
const review = require("../../controllers/review.js");


router.post("/createReview", (req,res) => {
    review.createReview(req.body, (status, data = "ok") => res.status(status).send(data));
});

router.post("/getNickname", (req,res) => {
    review.getNickname(req.body, (status, data = "ok") => res.status(status).send(data));
});

module.exports = router;