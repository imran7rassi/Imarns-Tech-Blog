
// requiring the path package //
const path = require("path");
// connecting the express package //
const express = require("express");
// requiring the express-session package //
const session = require("express-session");
// requiring the express handlebars from the packages //
const exphbs = require("express-handlebars");

// connecting the port //
const app = express();
const PORT = process.env.PORT || 4050;

// connecting the sequelize //
const sequelize = require("./config/connection.js");
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: "THe Most Secrert One",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};


app.use(session(sess));
// to express the handlebars //
// using the helpers //
const hbs = exphbs.create({
  helpers: {
    format_date: date => {
      return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    }
  }

});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(require('./controllers/'));

// running the app in localhost //
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
  sequelize.sync({ force: false });
});