
// requiring the express package //
const router = require('express').Router();
// connecting the post , comment and user from the models //
const { Post, Comment, User } = require('../models/');
// connecting the auth.js from the utils //
const withAuth = require('../utils/auth');

// this is the function to get all
// the post from the main homepage //
router.get('/', async (req, res) => {
  try {

    // posting the data //

    const postData = await Post.findAll({
      include: [User],
    });


    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('all-posts-admin', { posts, loggedIn: req.session.loggedIn});
  } catch (err) {
    res.status(500).json(err);
  }
});


// this is the function to get a single post //
router.get('/post/:id', withAuth, async (req, res) => {
  try {
 
    // post the data where to post is find one by their id //
    const postData = await Post.findOne({
     
      where: {id: req.params.id},
      include: [

        User,
        {
          model: Comment,
          include: [User],
        },

      ],

    });

    if (postData) {

      const post = postData.get({ plain: true });
      console.log(post);
      res.render('single-post', { post, loggedIn: req.session.loggedIn});
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});


// this is the login function 
// if it's done successfully so 
// redirect to the dashboard
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});


router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }

  res.render('signup');
  
});

module.exports = router;