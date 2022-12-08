
// middleware to verify user 
//loggied in before restricted
// route access given
const withAuth = (req, res, next) => {
    if (!req.session.userId) {
      res.redirect("/login");
    } else {

      // we use here the next function //
      next();
    }
  };
  
  module.exports = withAuth;