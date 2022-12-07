
// requiring the sequelize //

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

class Post extends Model {}

// this is the post init 
  Post.init(
  {
    // by their ID
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    // post title
    postTitle: {
      type: DataTypes.STRING(25),
      allowNull: false,
      unique: true,
    },

    // post content //
    postContent: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    // date created the post //
    dateCreated: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

    // and the userid //
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },  
  },
  
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'post',
  }
);

module.exports = Post;