
// requiring the express package //
const router = require('express').Router();

// connecting the user-routes.js //
const userRoutes = require('./user-routes.js');
// connecting the post-routes.js //
const postRoutes = require('./post-routes.js');
const commentRoutes = require('./comment-routes.js');

// using the user router //
router.use('/user', userRoutes);
// using the post router //
router.use('/post', postRoutes);
router.use('/comment', commentRoutes);

// export the routers //
module.exports = router;