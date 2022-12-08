
// requiring the express package //
const router = require("express").Router();
// connecting the post , comment and user from the models //
const { Post, Comment, User } = require("../models");


// this is the function to get all
// the post from the main homepage //
router.get("/", (req, res) => {
  Post.findAll({
    include: [User],
  })

    .then((dbPostData) => {
      const posts = dbPostData.map((post) => post.get({ plain: true }));

      res.render("all-posts", { posts });
    })

// propmp an err of 500 //
    .catch((err) => {
      res.status(500).json(err);
    });

});

// this is the function to get a single post //
router.get("/post/:id", (req, res) => {
  Post.findByPk(req.params.id, {
    // post the data where to post is find one by their id //
    include: [
      User,
      {
        model: Comment,
        include: [User],
      },
    ],
  })

  // to do a single post //
    .then((dbPostData) => {
      if (dbPostData) {
        const post = dbPostData.get({ plain: true });

        res.render("single-post", { post });
      } else {

        res.status(404).end();
      }
    })
// having an err of 500 //
    .catch((err) => {
      res.status(500).json(err);
    });
});


// this is the login function 
// if it's done successfully so 
// redirect to the dashboard
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");

});

router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("signup");
});

module.exports = router;