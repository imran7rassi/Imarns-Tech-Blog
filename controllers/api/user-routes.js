
// requiring the express package //
const router = require("express").Router();
// connecting the user from the models //
const { User } = require("../../models");


// this is the router for create a user //
router.post("/", (req, res) => {

  // creating a user by it's
  // username and password //
  User.create({
    username: req.body.username,
    password: req.body.password
  })

  .then(dbUserData => {
    req.session.save(() => {
      req.session.userId = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;

      res.json(dbUserData);
    });
  })

  // getting an err of 500 //
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });

});

// this is the router to login //
router.post("/login", (req, res) => {

  // to login by the username //
  User.findOne({
    where: {
      username: req.body.username
    }

    // when there is no user found promp a message //
  }).then(dbUserData => {
    if (!dbUserData) {
      res.status(400).json({ message: 'No user account found!' });
      return;
    }

    // validation of the password //
    const validPassword = dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password!' });
      return;
    }

    req.session.save(() => {
      req.session.userId = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;
  
      res.json({ user: dbUserData, message: 'You are now logged in!' });
    });
  });
});

// this is the router to logout //
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  }

  // get a status of 404 //
  else {
    res.status(404).end();
  }
});

// this is the router to delete the user //
router.delete("/user/:id", (req, res) => {

  // we use the destroy to delete the user by the id //
  User.destroy({
    where: {
      id: req.params.id
    }
  })

// when there is no id found get a message //
  .then(dbUserData => {
    if (!dbUserData) {
      res.status(404).json({ message: 'No user found with this id' });
      return;
    }
    res.json(dbUserData);
  })

  // getting an err of 500 //
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;