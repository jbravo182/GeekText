const router = require('express').Router();
let Book = require('../models/book.model');

router.route('/').get((req, res) => {
 Book.find()
    .then(books => res.json(books))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const title = req.body.title;
  const author = req.body.author;
  const description = req.body.description;
  const publishing = req.body.publishing;

  const newBook = new Book({
    title,
    author,
    description,
    publishing,
  });

  newBook.save()
  .then(() => res.json('Book added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.get(':id', (req, res) => {
  console.log(req.params, "KEVIN LOOK HERE")
    Book.collection.find({id: 1})
        .then(book => res.json(book))
        .catch(err => res.status(403)).json('Error: ' + err);
        
  /*Book.findById(req.params.id)
    .then(book => res.json(book))
    .catch(err => res.status(403).json('Error: ' + err));
    */
  });

router.route('/:id').delete((req, res) => {
  Book.findByIdAndDelete(req.params.id)
    .then(() => res.json('Book deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Book.findById(req.params.id)
    .then(book => {
        title = req.body.title;
        author = req.body.author;
        description = req.body.description;
        publishing = req.body.publishing;

      book.save()
        .then(() => res.json('Book updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;