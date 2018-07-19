const passport = require('passport'); //imports passport lbrary

module.exports = app => {
//this kicks them into our oauth flow (ask google for user permissions)
    app.get(
        '/auth/google', 
        passport.authenticate('google', { 
        scope: ['profile','email']
        }) 
    ); //two arguements, the frst is our route where we want the user to be directed to, the second tell express to use passaport and use strategy google
    //GoogleStrategy is known as 'google
    //second argument scope specifies to google servers what acces we want to have inside of the users profile, we are asking google to give us access to his profile nfo and email, google internally has a list that we can ask for


    //this happens when the user now gets sent to callback because they now have the code available/ we exchange the code with google for the user profile info (user logging into google email)
    app.get(
        '/auth/google/callback', 
        passport.authenticate('google')
    ); //second route handeler which will handle the case when user visits /auth/google/callback

    app.get('/api/logout', (req, res) => {
        req.logout(); //it takes the users cookie that contains the user id, and it kills the cookie 
        res.send(req.user); //this will send a proof the the user that they are no longer signed in
    });//whenever a user that is authenticated and makes a request to ('/api/logout) it will log them out

    app.get('/api/current_user', (req, res) => { //this will test to make sure, that someone Who has already gone through the oauth flow can get access(essentially they are now logged in)
        res.send(req.user);  //send back our res object (user model)
    });
}; // we export both handlers because we need to use the import of express app