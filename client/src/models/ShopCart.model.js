const mongoose = require('mongoose');

const ShopCartSchema = new Schema({
    email: { type: String, required: true},
    bookID: { type: Number, required: true},
}, {
    timestamps: true,
});

const ShopCart = mongoose.model('ShopCart', ShopCartSchema);

modules.exports = ShopCart;