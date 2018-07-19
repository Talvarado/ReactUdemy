// figures out what set of credentials to return (prod or dev)

if (process.env.NODE_ENV === 'production') { //this happens all through heroku
    //we are in prodution - return the prod set of keys
    module.export = require('./prod');
} else { // if we are running our local machine it will never === 'production thus it hits the else
    //we are in development - return the dev keys !!
    module.exports = require('./dev'); // require our file dev and immidietly pass back (export) the keys back
}


