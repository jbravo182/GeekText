const router = require('express').Router();
let Review = require('../../models/Review.model');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

router.route('/').get((req, res) => {
  Review.find()
    .then(Review => res.json(Review))
    .catch(err => res.status(400).json('Error: ' + err));
});
// book_id, book_title, nickname, rating, review
router.route('/add').post((req, res) => {
  const {book_id, book_title, nickname, rating, review} = req.body
  const newReview = new Review({book_id, book_title, nickname, rating, review});

  newReview.save()
    .then(() => res.json('Review added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Review.findById(req.params.id)
    .then(Review => res.json(Review))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Review.findByIdAndDelete(req.params.id)
    .then(() => res.json('Review deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/update/:id').post((req, res) => {
  const {name, bio, pic} = req.body
  Review.findById(req.params.id)
    .then(Review => {
        Review.name = name;
        Review.bio = bio;
        Review.pic = pic;
        Review.save()
        .then(() => res.json('Review updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;