
// requiring the sequelize //
const Sequelize = require('sequelize');

// require the dotenv file to config //
require('dotenv').config();

// we are creating connection
// to connect to our db file

const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PW, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
  });

module.exports = sequelize;