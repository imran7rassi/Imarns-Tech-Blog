
// requiring the express package //
const router = require("express").Router();
// connecting the comment from the models //
const { Comment } = require("../../models/");
// connecting the auth.js from the utils //
const withAuth = require("../../utils/auth");


// this is the post router to 
// create a new comment
router.post("/", withAuth, (req, res) => {
  Comment.create({ ...req.body, userId: req.session.userId })
    .then(newComment => {
      res.json(newComment);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;