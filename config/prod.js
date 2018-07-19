// production keys here
module.exports = {
    googleClientID: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    mongoURI: process.env.MONGO_URI,
    cookieKey: process.env.COOKIE_KEY //can be anything random
};


//TAKES ALL THE KEYS FROM ENVIRONMENT VARIABLES we will set them all up in heroku! not in the file