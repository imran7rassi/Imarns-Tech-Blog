
// connecting the sequelize //
const { Sequelize, Model, DataTypes } = require('sequelize');
// connecting the connection.js //
const sequelize = require('../config/connection.js');

// class for post //
class Post extends Model {}

// init the post //
Post.init(
  {
    title: DataTypes.STRING,
    body: DataTypes.STRING
  },
  {
    sequelize
  }
);

module.exports = Post;