
// requiring the sequelize and bcrypt //
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/config');

// this is the class for the user //
// to check the password //

class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// this is the user init //
 User.init(
  {
    // by the ID //
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    // the username //
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    // the password //
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
       
      },
    },

  },
  
  {

    // hooks for before create and befor update the userdata //
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      },
      
    },

    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }

);

module.exports = User;