const router = require('express').Router();
let Book = require('../../models/book.model');

router.route('/').get((req, res) => {
    Book.find()
    .then(books => res.json(books))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const title = req.body.title;
  const author = req.body.author;
  const description = req.body.description;
  const cover = req.body.cover;
  const publisher = req.body.publisher;
  const genre = req.body.genre;
  const pub_date = req.body.pub_date;
  const price = req.body.price;


  const newBook = new Book({
    title,
    author,
    description,
    cover,
    publisher,
    genre,
    pub_date,
    price
  });
  
  newBook.save()
  .then(() => res.json('Book added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Book.findById(req.params.id)
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
        
        book.save()
        .then(() => res.json('Book updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;