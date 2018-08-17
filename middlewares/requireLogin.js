module.exports = (req, res, next) => { //next is somthing we call when our call back is all done
    if(!req.user) {
        return res.status(401).send({ error: 'You must logged in'}); //status frobidden and send error message
    }

    next(); //everything looks good lets go to next request middleare
};

// we made this middleware seperate and not in our index.js because only some routes needs this middleware
//we now import it into billingroutes.js