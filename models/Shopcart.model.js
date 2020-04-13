const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ShopcartSchema = new Schema({
  item: {type: Array, required: true}

}, {collection: 'ShopCart'}, { versionKey: false });

const shopcart = mongoose.model('ShopCartSchema', ShopcartSchema);

module.exports = shopcart;