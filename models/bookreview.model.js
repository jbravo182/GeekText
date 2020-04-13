const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;

const reviewSchema = new Schema({

 book_id: {
    type: ObjectId,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  book_title : {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  
  nickname : {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  rating : {
    type: Number,
    required: true,
  },
  review : {
    type: String,
  }
}, {collection: 'Review'}, { versionKey: false });

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;