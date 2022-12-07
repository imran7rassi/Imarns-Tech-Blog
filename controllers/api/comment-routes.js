
// requiring the express //
const router = require('express').Router();
// importing the comment.js from the models //
const { Comment } = require('../../models/');
// connecting the auth.js from the utils //
const withAuth = require('../../utils/auth');


// this is the get router //
router.get('/', withAuth, async (req, res) => {
 try{ 
    // find all function //
  const commentData = await Comment.findAll({
    include: [User],
  });

// here we serialize the data
  const comments = commentData.map((comment) => comment.get({ plain: true }));

  console.log(comments);
  
  // response the comment //
  res.render('single-post', {comments, loggedIn: req.session.loggedIn});
} catch(err) {

    // otherwise give an err of 500 //
    res.status(500).json(err);
}
});

// this is the post router //
router.post('/', withAuth, async (req, res) => {
  const body = req.body;

  // adding the new comment //
  try {
    const newComment = await Comment.create({
      ...body,
      userId: req.session.userId,
    });
    res.json(newComment);
  } catch (err) {

    // otherwise prompt an err of 500 //
    res.status(500).json(err);
  }
  
});

module.exports = router;