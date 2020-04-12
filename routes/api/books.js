const router = require('express').Router();
const Book = require('../../models/book.model');
const Author = require('../../models/author.model');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;


router.route('/').get((req, res) => {
    Book.find()
    .then(books => res.json(books))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post(async(req, res) => {
    const {title,author,authorId,description,cover,publisher,genre,pub_date,price,topSeller,avg_rating} = req.body;

    let authorModel = await Author.findById(authorId);

   const newBook = new Book({
    title,
    author,
    authorId: authorModel,
    description,
    cover,
    publisher,
    genre,
    pub_date,
    price,
    topSeller,
    avg_rating,
  }); 
  
  newBook.save()
  .then(() => res.json('Book added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Book.aggregate([
        { "$match": { "_id": ObjectId(req.params.id) } },
        {
        '$lookup':
          {
            from: "Author",
            localField: "authorId",
            foreignField: "_id",
            as: "author_info"
          }
     }])
    .then(book => res.json(book))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Book.findByIdAndDelete(req.params.id)
    .then(() => res.json('Book deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Book.findById(req.params.id)
    .then(book => {
        book.title = req.body.title;
        book.author = req.body.author;
        book.description = req.body.description;
        book.cover = req.body.cover;
        book.publisher = req.body.publisher;
        book.genre = req.body.genre;
        book.pub_date = req.body.pub_date;
        book.price = req.body.price;
        book.avg_rating = req.body.avg_rating;
        
        book.save()
        .then(() => res.json('Book updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;