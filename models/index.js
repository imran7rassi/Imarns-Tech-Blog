
// this is to import the user, post and comment js
// t the index.js //
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// this function create association between user and project//

User.hasMany(Post, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

User.hasMany(Comment, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

Post.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

Post.hasMany(Comment, {
  foreignKey: 'postId',
  onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
  foreignKey: 'userId',
});

Comment.belongsTo(Post, {
  foreignKey: 'postId'
});

// we use module .exports
//to export the user, comment and post
module.exports = {
  User,
  Comment,
  Post
};