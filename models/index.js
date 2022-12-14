
// connecting the user //
const User = require('./users');
// connecting the post.js //
const Post = require('./post');
// connecting the coment //
const Comment = require('./comments');

// Creates an association between
// this (the source) and the provided target. 
Post.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

// Create an association that is either 1:m or n:m
Post.hasMany(Comment, {
  foreignKey: 'postId',
  onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

// exporting the user, comment and posts //
module.exports = {
  User,
  Comment,
  Post,
};