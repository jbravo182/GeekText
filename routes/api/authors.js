const router = require('express').Router();
let Author = require('../../models/author.model');

router.route('/').get((req, res) => {
  Author.find()
    .then(Author => res.json(Author))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const name = req.body.name;
  const bio = req.body.bio;

  const newAuthor = new Author({name, bio});

  newAuthor.save()
    .then(() => res.json('Author added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Author.findById(req.params.id)
    .then(Author => res.json(Author))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Author.findByIdAndDelete(req.params.id)
    .then(() => res.json('Author deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Author.findById(req.params.id)
    .then(author => {
        author.name = req.body.name;
        author.bio = req.body.bio;
        author.save()
        .then(() => res.json('Author updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;