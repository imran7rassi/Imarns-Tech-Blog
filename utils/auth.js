
const withAuth = (req, res, next) => {
    // so if the user not logged 
    // redirect it back to the login page
    // to logged 

    if(!req.session.user_id) {
        res.redirect('/login');
    } else {

        // so if the user logged in allow it to 
        // view the next page 
        // this next function is use if the user
        // is authenticated
        next();

    }
};

module.exports = withAuth;