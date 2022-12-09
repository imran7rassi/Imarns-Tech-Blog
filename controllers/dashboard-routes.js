
// requiring the express package //
const router = require("express").Router();
// connecting the post and user from the models //
const { Post } = require("../models");
// connecting the auth.js ffrom the utils //
const withAuth = require("../utils/auth");

// posting to the dashboard //
router.get("/", withAuth, (req, res) => {

  // store the results of the db query
  // in a variable called postData. should use
  // something that "finds all" from the Post model.
    Post.findAll({
      where: {
        userId: req.session.userId
      }
    })

    // this sanitizes the data we just got from the db
      .then(dbPostData => {
        const posts = dbPostData.map((post) => post.get({ plain: true }));
        
        res.render("all-posts-admin", {
          layout: "dashboard",
          posts
        });
      })
      // promp an err //
      .catch(err => {
        console.log(err);
        res.redirect("login");
      });

  });

  // to add a new post //
  router.get("/new", withAuth, (req, res) => {
    res.render("new-post", {
      layout: "dashboard"
    });

  });
  
  // this is used to find it by the apikey
  router.get("/edit/:id", withAuth, (req, res) => {
    Post.findByPk(req.params.id)
      .then(dbPostData => {
        if (dbPostData) {
          const post = dbPostData.get({ plain: true });
          // if it's done so post
          res.render("edit-post", {
            layout: "dashboard",
            post
          });

          // otherwise status of 404
        } else {
          res.status(404).end();
        }
      })

      // or propmt an err of 500 //
      .catch(err => {
        res.status(500).json(err);
      });
  });
  
module.exports = router;