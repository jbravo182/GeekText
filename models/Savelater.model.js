const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SaveLaterSchema = new Schema({
  item: {type: Array, required: true}

}, {collection: 'SaveLater'}, { versionKey: false });

const savelater = mongoose.model('SaveLaterSchema', SaveLaterSchema);

module.exports = savelater;