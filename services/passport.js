const passport = require('passport'); //imports passport lbrary
const GoogleStrategy = require ('passport-google-oauth20').Strategy; //import specific google strategy
const keys = require('../config/keys'); //if our file is js we dont have to put keys.js
const mongoose = require('mongoose'); //import mongoose library

const User = mongoose.model('users'); //we need to import our model class from our Users file, we need to do it like this so we dont get eerors when testing snce mongoose usually does get erros

passport.serializeUser((user, done) =>{   //user represents the data we just recieved from the database from below // to correctly atch our user by checking their mongo id, not the google profile id, since they might be using different things to login in(some people may be using facebook login instead)
    done(null, user.id); //done is a callback, null means nothing went wrong, user.id is the data that will identify the user (user.id is not profileId, it is the other id in the database attached to the user, its the mongo id)
}); //check diagram to see why we are using mongo id in this and google id in the bottom one

passport.deserializeUser((id, done) => { //turn an id into a mongoose model instance //when we find the particular user we will call done
    User.findById(id) //we want to do a wuery to find the id so we can get profile info in exchange
        .then(user => {
            done(null, user);
        });
});

passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true ////we have to add another  to our google strategy because google doesnt know to trust heroku, turn https into http which is not safe
    }, 
    (accessToken, refreshToken, profile, done) => {
        User.findOne({ //a query to search our mongo db
            googleId: profile.id //look though the records and find the first record with the same google id 
        }).then((existingUser) => { //.then is a promise which will do something depending on what happens
            if (existingUser){
                //we already have a record with the gven profile id
                done(null, existingUser); //we need to pass two thing to done, 1 if everything went well, 2nd will give us the existing user record (We are all done, here is the user we found)
            } else {
                //we want to create a new user because we dont have any with that id
                new User({ //this creates a mongo model instance (a single recod in our collection)
                    googleId: profile.id})   //this represents one recor, it creates a new instance of a model
                .save() //.save so that as soon as it retrieves the info it saves it (saves instance)
                .then(user => done(null,user)); //we do this to MAKE COMPLETE SURE that we saved the user to the database before we call done
            } //with callbacks we can save a record that represents a new user
        }) // anytime we use our mongoose db (to search, delete,change) we are dong a asychronse action, whch eans it doesnt return results, t returns a promise, we need a return statement
    })
);// tell our passport how to use google strategy and make use of it =>passport.use general way to tell passport to use google strategy => new GoogleStrategy() creates a new instance of a google authentification, inside function we will pass in a configuration
// we need to give it a client id and client secret, bot provded to us by googles oauth servce
// we must regster with google api, so google knows that we will be using their service to auth our users
//console.developers.google.com
// first create proj, sec enable google api (google+ api), third generate api credential (to access our account) -> go to credentials, create a oaut id this will make a consent screen
//client id:   //public token we can share 
//client secret:  //private token do not share, if we commit our code to github everyone can see this, thus we must store our keys in our config/keys folder to secure them
//our last piece is the route where the user gets sent back with the code that google gives us back when the user grants google permission 
// we pass two arguements, the second one is a callback function after the user allows permission for our serves to access their google info, our opportunity to create a new user n our database
//CALLBACK url must match up with the one on google api for allowable redrected urls
//GoogleStrategy is known as 'google
//accessToken allows us to reach back to google and let them know that the user has already given us permission to do stuff in their account
//refrresh token allows us to refresh the access token since the access token expires after sometime
//we arnt using either tokens for our app
//profile is what we are about, user info

//we have to check in our passaporrt to see if someone in our database already ahve a profile with the same id, to make sure you dont have duplicate accouns
//we must do a query search

//now that we found the account we have to return a cookie (identification token) to let our browser know that its a returning user and give them access back to our browser
//or if no user was found we give them a new token that will forever identify them
//thus we must generate the token by defining a function called SERIALIZED USER 
//after we do that we will pass the pieces of info to passaport, and the passaport will stuff that token into the users cookie Title

//once the user wants to see information pertaining to him they must make a request to our broswer, the cookie will be in the request (serialedUser) takes user info and turns it into a cookie
//passaport will take that request and take the cookie, identify the user and return the users information after authenticating them (deserializedUser) takes cookie and turns it into user info

//last thing is make passaport aware that it needs to use Cookies to take care of the user authentication



