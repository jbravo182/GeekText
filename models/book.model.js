const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  authorId: {type: Schema.Types.ObjectId, ref: 'Author', required: false},
  description: { type: String, required: true },
  cover: { type: String, required: true },
  publisher: { type: String, required: true },
  genre: { type: String, required: true },
  pub_date: { type: String, required: true },
  price: { type: String, required: true },
  topSeller: { type: Boolean, required: true },
  avg_rating: { type: Number, required: true }
}, {collection: 'Book'}, { versionKey: false });

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;