const keys = require('../config/keys');
const stripe = require('stripe') (keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');
//we must alos pass in our key
////imports stripe library
//bill and add credit to an account
module.exports = app => {
    app.post('/api/stripe', requireLogin, async (req, res) => {
        // console.log(req.body);
        //we need to check if user is logged in or not thus we can assign credit to the aacount
        // if(!req.user) {
        //     return res.status(401).send({ error: 'You must logged in'}); //status frobidden and send error message
        // } //SINCE A LOT OF COMPONENETS WILL NEED THIS WE DONT WANT TO RE WRITE IT THUS WE MAKE THIS ITS OWN COMPONENT

        const charge = await stripe.charges.create({ //this will return a promise
            amount: 500, //the amount of money we want to bll, we idd this on front end, this is on backend
            currency: 'usd',
            description: '$5 for 5 credits',
            source: req.body.id //what charge source (credit card) we are tryng to bill, we need to use the id property from our token
        })//this will create the actual charge and bill the credit card and then send response back to api saying that the charge has sucessfully been created
        // console.log(charge);
        req.user.credits += 5;
        const user = await req.user.save(); //req.user get assigned by passaport on index.js

        res.send(user);
    }); //adding credits to user vid 103
};
//this is so our stipe token will go to the api after user puts in credit card number and presses submit
// video 98
// npm install --save stripe (in server)
//npm install --save body parser (so we can parse our token when using stripe and express)
//frontend