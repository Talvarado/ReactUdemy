const mongoose = require ('mongoose'); //import mongoose library
// const Schema = mongoose.Schema; //option 1
const { Schema } = mongoose; //we are pulling one properity out of the mongoose library //option 2 (es6 destructuring)

const userSchema = new Schema ({
    googleId: String
});  //here we have to define what roperties will be in each record using schema

mongoose.model('users', userSchema); //this turns it into a model class