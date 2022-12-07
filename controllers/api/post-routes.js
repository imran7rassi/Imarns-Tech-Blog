
// requiring the express package //
const router = require('express').Router();
// connecting the post.js from the models //
const { Post } = require('../../models/');
// connecting the auth.js from the utils //
const withAuth = require('../../utils/auth');

// we create a post //
router.post('/', withAuth, async (req, res) => {
  const body = req.body;
    console.log(body);

    // we create a new post 
    // if it's created console log 
    // a succed message
  try {
    const newPost = await Post.create({ ...body, userId: req.session.userId });
    console.log("Here is the new post: ",  newPost);
    res.json(newPost);

    // otherwise give an err message //
     } catch (err) {
       console.log('IT FAILED!', err);
    res.status(500).json(err);
  }
});


// this is for updating the post //
router.put('/:id', withAuth, async (req, res) => {
  try {
    console.log('here is the req.body', req.body);
    const [affectedRows] = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (affectedRows > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
// if it's not succed give an err of 500 //
  } catch (err) {
    res.status(500).json(err);
  }

});

// this is the function
// for deleting the post
router.delete('/:id', withAuth, async (req, res) => {
  try {

    // we delete it with their id //
    const [affectedRows] = Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    // if it's done give 200 OK //
    if (affectedRows > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }

    // otherwise give an err of 500 //
  } catch (err) {
    res.status(500).json(err);
  }
  
});

module.exports = router;