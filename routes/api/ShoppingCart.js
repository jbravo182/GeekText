const router = require('express').Router();
const ShoppingCart = require('../../controllers/ShoppingCart.js');
let ShopCart = require('../../models/ShopCart.model');

//mongoose
router.route('/').get((req, res) => {
    ShopCart.find()
    .then(shopcartInfo => res.json(shopcartInfo))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/displayAll').post((req, res) => {
    const email = req.body.email;
    const bookID = req.body.bookID;
    const displayShopCart = new ShopCart({shopcart});
})

//mongodb
router.post("/displayAll", (req,res) => {
    ShoppingCart.displayAll(req.body, (status, data = "ok") => res.status(status).send(data));
});

router.get("/displayAll", (req,res) => {
    console.log("got in routes");
    ShoppingCart.displayAll(req.body, (status, data = "ok") => res.status(status).send(data));
});

router.post("/delete", (req,res) => {
    ShoppingCart.delete(req.body, (status, data = "ok") => res.status(status).send(data));
});

router.post("/add", (req,res) => {
    ShoppingCart.add(req.body, (status, data = "ok") => res.status(status).send(data));
});

module.exports = router;