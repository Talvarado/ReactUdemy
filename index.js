const express = require ('express'); // import express library, we write it like this for server side, react side uses 'import'. COMMON JS MODULES
const mongoose = require('mongoose'); //import mongoose library
const cookieSession = require('cookie-session'); //import cookiesession
const passaport = require('passport'); //import passport since we need to tell passport to use cookies with cookie session 
const bodyParser = require('body-parser'); //this is a iddleware to help with parsing token when using stripe and express
const keys = require ('./config/keys'); //import keys we need to use mongoos
require('./models/User') //imports configuration from our users file
require ('./services/passport'); //import passaport from our passaport file

mongoose.connect(keys.mongoURI); //we paste in out mlab (To connect using a driver via the standard MongoDB URI), 
const app = express(); //  CREATES FIRST EXPRESS APPLICATION, we call it as a functon so that it represents it as an applcation. app is used to set up confguration that listens for requests and route them to the handelers


app.use(bodyParser.json()); //this is for all request that will parse the boody and assign it to req.wait for billing routes.js

//app.use are wiring up as Middleware (small functions that are used to modify our incoming requests in our app before they are sent off to the route handelers)
//look at diagram 
app.use(
    cookieSession({ // extracts data from cookie and assigns it to req.session //** cookie-session and express session are different things! (in case you want to look up express session)
        maxAge: 30 * 24 * 60 * 60 * 1000, //the cookie should last for 30 until expiring
        keys: [keys.cookieKey] //this key will be used to encryppt the cookie so no one can change the user id we put in there, the key is in our config/keys for saftey
    })
);// instruct passaport that it needs to make use of cookies to handle the authentication for us //express does not know how to use cookies
//this is why we have to install cookie session to tell express how to use cookies
//extra: express sessions difference between cookie session is the way the data is stored inside of the cookie
//cookie-session (the cookie is the session, t contains all of the data related to the current session, the actual user id)
//express-session stores a Refrence to a session(stores insde of the cookie an ID of a Session from the session store, nothng else)
//look at diagram Sessions with express
//express we store data outside cookie in a remote location, cookie session we store data inside cookie , we can store all the info as we would like, stuff as much things in there
//with a cookie we are limited to the aount of stuff we can store (about 4 kb) we are using it here because we only care about the user id
//with express we need to set up an outside d=servers (pain in the rear)

app.use(passaport.initialize()); 
app.use(passaport.session());

require('./routes/authRoutes')(app); //so we can use our handelers in our routes.js. wee call the function imidietly calls app right after
require('./routes/billingRoutes')(app);

// const PORT = process.env.PORT || 5000; // when heroku runs our app, it will enject environent varables, esentially heruku passes us a confguration that heroku wants to tells us when are app starts to be executed by heroku, checks which port heroku wants us to use
const PORT = process.env.PORT || 5000;
app.listen(PORT); // instructs express to tell node that it wants to listen to incoming traffic on port we declare or port 5000


//NOTES

// 4 STEPS TO GET OUR PROJECT DEPLOYED ON HEROKU (any node js)
// Dynamic port binding, above Const Port
// Specify Node Envronment on package,json => engines {node: , npm: }
// Specify start script on package,json, => Script "start : index.js" how we would run it on node
// create .gitignore file = > node_modules (ignore node module folder)

/////TEST
// app.get('/', (req, res) => {
//     res.send({hi: 'there'});
// }); 
//test route
//Creates a route handeler and associates it with a given route, this is using express
//app -> represents underlying running express server --> app.get we are creating brand new route handeler (the whole code is route handerler)
//app.get tells express that we want to create a route handeler that is watching for incomign http requests with a very specific method
//get = get info (method for route handeler)
// '/' => route porstion of the hnadeler, tells express to watch for incoming rquests that are attempting to access some very particular route local host 5000
//req => (arguement to arrow functon) this is short for request, javascript object that represents the incoming request, who is makng the request type of data
//res => short for response, represents the response or the data that is gonna be sent back to whomever made the request
//res.send({hi: 'there'}); => body of the arrow function, tells exress that we want to midietlt close the request and send back the response jason data 'Hi: "there"'
//the second arguemnt was the arrow function =>>> (req, res) => res.send({hi: 'there'});

//http is stateless, betweeen any two gven requests we make, http inherently has no way to identfy or share informarton between 2 seperate requests
//this information between requests are not shared
//the server has to respond with a unique piece of information that attaches to the user (token), the server returns to us a token, with that token it keeps track and is unique to the person who made the requests, thus follow up requests are used with the same token
//we will use cookie based authentification, when we get an initial request to our server, they will go through the google oauth process and in the response we send back to the user we will include a header inside of the response
// the header will have a property called set cookie, it will be a random token and it will uniquly identify the user
//when the browser sees the token in the header, the browser will automatically append that cookie with any follow up request sent back to our server,
//thats how our server knows that its the same person
//cookie authentification is an elegant way to manage tokens, without us having to do anything, the browser takes care of it.
//we use the google id to identfy the same person // the id is in the object we recieve in info in exchange for our code this is now our token
//LOOK AT DIAGRAM !
//WE CAN ONLY HAVE ACCES TO THE SITE WHEN WE GET OUR COOKIE BACK FROM THE SERVER/DATABASE
//*THE WHOLE PURPOSE OF OAUTH IS TO GIVE US OUR IDENTIFICATION TOKEN (GOOGLE ID). THATS IT! 


//WE NEED MONGO DB TO STORE USER INFO(including token)

//we use mongoose to easily access mongodb
//a collection in mongdb will be a model classs in mogoose
//a record insde of a colleccton is represented as a model instance
//m lab => remote mongo database host we signes up for account and then we must connect it to mongoDB
//what we did, we connected a remote nstance of mongo by using mongoose library.
// we need a databse to create a new collection of records, users collection


//***** main goal get a id into the users cookie so that they cookie will us who they are eveytime they make a request */

//auth end



//React start
//npm install -g create-react-app // starter package for react
//create-react-app client ////// must do this in server, very important to call it client // it will create our folder client which will have all out react stuff in it
// the client folder has its own built in server, thus to start the react portion we run "npm start"
//this means react has their own server so our project will have a 2nd server, setup easy, understanding it not so much

//express server serves up data
//react server serves up compnents for visual client purposes
//we use two servers is because create react app has already a lot of great things in it, rather than trying to wire bable and webpack and 100+ to the express server
//getting them to work together is simple and straight forward
//LOOK AT DIAGRAM WHY TWO SERVERS

//to get both server running together we :
//use CUNCURENTLY that helps us run two seperate servers with one command
//we added two scripts on our server package.json,
//1st to start our client side server ("client": "npm run start --prefix client") // --prefix clien means to run it from our client folder
//2nd to start both togteher "dev": "concurrently \"npm run server\" \"npm run client\"" => npm start dev
//we had to install concurrently module, it will start both servers at the same time

//run back end now with npm run server // before it was npm run dev but we changed t to make both servers work together
//to run front end npm run start

// netstat -ano | findstr :3000

//taskkill //PID 16948 //f


//"proxy": {
    // "/auth/google" : {
    //     "target": "http://localhost:5000"
    //   }

//makes both serves work together nicely
// if anyone makes a request trys to vst /auth/google on our react server, automatically forward the request to local host 5000/auth/google
//look at Dev Mode diagram (only for our dev environment) , heroku takes care of the production side 
// IN PRODUCTION THE CREATE REACT SERVER DOES NOT EXIST!! //that is why we dont have to specify in our proxy our actual website url
//heroku will use our build to run the entire app
//thats why we only use relastive routes in production (/auth/google)
//proxy purpose : beacuse we are runnin gto servers in our dev environment, so any request in react server needs to be proxied to our express serve


//ARCHITECUTE BONUS VID 56 *
// dotn have to worry about json web tokens, our react headers etc
// we dont have to worry about CORS
//VERY GOOD DIAGRAM OF ENTIRE OAUTH FLOW BOR DEV AND FOR PROD 
//BASICALLY WE ONLY NEEDED TO ADD THE PROXY(PACKAGE.JSON/CLIENT) TO MAKE EVERYTHING WORK...


//all client stuuff needs to be installed inside of client
//we must do action creators, reducers to wire up eveything properly front end

//we will now install stripe for billing purposes in our client side
//npm install --save react-stripe-checkout
//organize keys in backen
//organize keys in front end
// we now have finsihed credits

//we have to deply onto heroku,,, we deploy differentlyt hen usual
//video108
//we have to run npm run build (in client)
