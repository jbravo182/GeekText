const router = require('express').Router();
let Author = require('../../models/author.model');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

router.route('/').get((req, res) => {
  Author.find()
    .then(Author => res.json(Author))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const {name, bio, pic} = req.body
  const newAuthor = new Author({name, bio, pic});

  newAuthor.save()
    .then(() => res.json('Author added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Author.findById(req.params.id)
    .then(Author => res.json(Author))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/books/:id').get((req, res) => {
  Author.aggregate([
      { "$match": { "_id": ObjectId(req.params.id) } },
      {
      '$lookup':
        {
          from: "Book",
          localField: "_id",
          foreignField: "authorId",
          as: "books"
        }
   }])
  .then(book => res.json(book))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Author.findByIdAndDelete(req.params.id)
    .then(() => res.json('Author deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/update/:id').post((req, res) => {
  const {name, bio, pic} = req.body
  Author.findById(req.params.id)
    .then(author => {
        author.name = name;
        author.bio = bio;
        author.pic = pic;
        author.save()
        .then(() => res.json('Author updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;