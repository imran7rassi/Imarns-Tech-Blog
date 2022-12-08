
// requiring the sequelize model from the package //
const { Sequelize, Model, DataTypes } = require('sequelize');
// connecting the connection.js //
const sequelize = require('../config/connection');

// class for the comment //
class Comment extends Model {}

// init the comment //
Comment.init(

  {
    body: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },

  {
    sequelize
  }
  
);

module.exports = Comment;