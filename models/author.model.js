const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const authorSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  bio : {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  pic : {
    type: String,
    required: true,
    unique: false,
    trim: true,
    minlength: 3
  }
}, {collection: 'Author'}, { versionKey: false });

const Author = mongoose.model('Author', authorSchema);

module.exports = Author;