const allowedOrigins = require("./allowedOrigins")
const {all} = require("express/lib/application")

// Cors options = allowed or don't the server and the website to connect
const corsOptions = {
    origin : (origin, callback) => {
        if(allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Non autorisé par CORS'))
        }
    },
    credentials : true,
    optionSuccessStatus : 200
}

module.exports = corsOptions