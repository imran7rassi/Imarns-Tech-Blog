
// connecting the express package //
const router = require("express").Router();
// connecting the post , comment and user from the models //
const { Post, Comment, User } = require("../../models/");
// connecting the auth.js from the utils //
const withAuth = require("../../utils/auth");

// this is the post router to create a post request //
router.post("/", withAuth, (req, res) => {
  const body = req.body;
  console.log(req.session.userId);

  // creating a post //
  Post.create({ ...body, userId: req.session.userId })
    .then(newPost => {
      res.json(newPost);
    })

    // getting an err of 500 //
    .catch(err => {
      res.status(500).json(err);
    });

});

// this is the function to 
// update a post by it's id
router.put("/:id", withAuth, (req, res) => {
  console.log(req.body, req.params.id)

  // update the post //
  Post.update(req.body, {
    where: {
      id: req.params.id
    }
  })

    .then(affectedRows => {
      if (affectedRows > 0) {
        res.status(200).end();

      } else {

        res.status(404).end();
      }
    })
    // getting an err of 500 //
    .catch(err => {
      res.status(500).json(err);
    });

});

// this is the function to delete 
// a current post from the posts
router.delete("/:id", withAuth, (req, res) => {
  console.log(req.body, req.params.id)

  // we use .destroy to delete the post //
  Post.destroy({
    where: {
      id: req.params.id
    }
  })

    .then(affectedRows => {
      if (affectedRows > 0) {
        res.status(200).end();
      } else {
        res.status(404).end();
      }
    })

    // getting an err of 500 //
    .catch(err => {
      res.status(500).json(err);
    });
    
});

module.exports = router;