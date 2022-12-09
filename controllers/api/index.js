
// requiring the express package //
const router = require('express').Router();
// connecting the user routes //
const userRoutes = require('./user-routes.js');
// connecting the post routes //
const postRoutes = require('./post-routes');
// connecting the comment routes //
const commentRoutes = require('./comment-routes');

// using the routes //
router.use('/user', userRoutes);
router.use('/post', postRoutes);
router.use('/comment', commentRoutes);

module.exports = router;