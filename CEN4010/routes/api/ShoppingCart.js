const router = require('express').Router();
const fs = require('fs');
const ShoppingCart = require('../../controllers/ShoppingCart.js');
let ShopCart = require('../../models/Shopcart.model.js');
let SaveLater = require('../../models/Savelater.model.js');

//mongoose
router.route('/').get((req, res) => {
    ShopCart.find()
    .then(shopcartInfo => res.json(shopcartInfo))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update').post((req, res) => {
    
    var query = req.body.data;
    var type = req.body.type;

    req.newData.item = req.body.item;
    const displayShopCart = new ShopCart({Shopcart});
    const saveLaterList = new SaveLater({Savelater});
   
    //https://stackoverflow.com/questions/7267102/how-do-i-update-upsert-a-document-in-mongoose

    if(type == "cart")
    {
        displayShopCart.findOneAndUpdate(query, query, {upsert: true}, function(err, doc) {
        if (err) return res.send(500, {error: err});
        return res.send('Succesfully saved.');
        });
    }
    else if (type == "save")
    {
        saveLaterList.findOneAndUpdate(query, query, {upsert: true}, function(err, doc) {
        if (err) return res.send(500, {error: err});
        return res.send('Succesfully saved.');
        });
    }
        
});

router.route('/list').get((req, res) => {

    var type = req.body.type;

    if(type == "cart")
    {
        ShopCart.find()
        .then(shopcartlist => res.json(shopcartlist))
        .catch(err => res.status(400).json('Error: ' + err));
    }
    else if(type == "save")
    {
        SaveLater.find()
        .then(savelater => res.json(savelater))
        .catch(err => res.status(400).json('Error: ' + err));
    }

});

/*
    ok so the JSON object is passed on then it is stringified to write it on the path below
    also the shopcart list must have the following entries if adding the object to the file
    - bookImageURL
    - bookName
    - bookDescription
    - bookPrice
*/

router.route('/upload_cart').post((req, res) => {
    
    console.log(req.body);

    var target = 'cartData';
    let data = JSON.stringify(req.body);
    fs.writeFile('client/src/models/'+ target + '.json', data, (err) => {
        if (err) throw err;
            
    });
    
   
});

router.route('/upload_save').post((req, res) => {
   
    console.log(req.body);
    
    var target = 'saveData';
    let data = JSON.stringify(req.body);
    fs.writeFile('client/src/models/'+ target + '.json', data, (err) => {
        if (err) throw err;
            
    });
    
});

/*
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
router.post("/update", (req,res) => {
    ShoppingCart.update(req.body, (status, data = "ok") => res.status(status).send(data));
});
*/
module.exports = router;