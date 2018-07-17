const express = require ('express'); // import express library, we write it like this for server side, react side uses 'import'. COMMON JS MODULES
const app = express(); //  CREATES FIRST EXPRESS APPLICATION, we call it as a functon so that it represents it as an applcation. app is used to set up confguration that listens for requests and route them to the handelers

app.get('/', (req, res) => {
    res.send({hi: 'there'});
}); 
//Creates a route handeler and associates it with a given route, this is using express
//app -> represents underlying running express server --> app.get we are creating brand new route handeler (the whole code is route handerler)
//app.get tells express that we want to create a route handeler that is watching for incomign http requests with a very specific method
//get = get info (method for route handeler)
// '/' => route porstion of the hnadeler, tells express to watch for incoming rquests that are attempting to access some very particular route local host 5000
//req => (arguement to arrow functon) this is short for request, javascript object that represents the incoming request, who is makng the request type of data
//res => short for response, represents the response or the data that is gonna be sent back to whomever made the request
//res.send({hi: 'there'}); => body of the arrow function, tells exress that we want to midietlt close the request and send back the response jason data 'Hi: "there"'
//the second arguemnt was the arrow function =>>> (req, res) => res.send({hi: 'there'});

const PORT = process.env.PORT || 5000; // when heroku runs our app, it will enject environent varables, esentially heruku passes us a confguration that heroku wants to tells us when are app starts to be executed by heroku, checks which port heroku wants us to use

app.listen(PORT); // instructs express to tell node that it wants to listen to incoming traffic on port we declare or port 5000

// 4 STEPS TO GET OUR PROJECT DEPLOYED ON HEROKU (any node js)
// Dynamic port binding, above Const Port
// Specify Node Envronment on package,json => engines {node: , npm: }
// Specify start script on package,json, => Script "start : index.js" how we would run it on node
// create .gitignore file = > node_modules (ignore node module folder)


