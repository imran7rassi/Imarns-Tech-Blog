

// require the express package //
const router = require('express').Router();
// connecting the user from the models //
const { User } = require('../../models');


// here is the post to sign up for the app //
router.post('/', async (req, res) => {
  try {

    // entering the new username and password //
    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password
    });

    // this is the save function //
    req.session.save(() => {
      req.session.userId = newUser.id;
      req.session.username = newUser.username;
      req.session.loggedIn = true;

      // it shows that the newuser added //
      res.json(newUser);
    });

    // otherwise prompt an err of 500 //
  } catch (err) {
    res.status(500).json(err);
  }
});



//  this is the function to Login //
router.post('/login', async (req, res) => {
  try {

    // finding the user by it's username //
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    // if there is no username by required 
    // username show a message
    if (!user) {
      res.status(400).json({ message: 'No user account found!' });
      return;
    }

    // the password check function 
    const validPassword = user.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'No user account found!' });
      return;
    }

    // the save function //
    req.session.save(() => {
      req.session.userId = user.id;
      req.session.username = user.username;
      req.session.loggedIn = true;

      // this is the message when you logged in //
      res.json({ user, message: 'You are now logged in!' });
    });

    // if there is an err prompt a message //
  } catch (err) {
    res.status(400).json({ message: 'No user account found!' });
  }

});


// the logout function //
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();

    });
// if there is issue with logging out show status of 404 //
  } else {
    res.status(404).end();
  }

});

module.exports = router;