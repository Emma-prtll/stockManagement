const allowedOrigins = require("./allowedOrigins")
const {all} = require("express/lib/application"); //Importation du tableau des adresses autorisées

//Options "cors" qui autorise ou non les sites à se connecter à notre serveur
const corsOptions = {
    origin : (origin, callback) => {
        //Si la personne qui essaye de se connecter est acceptée (donc fait partis du tableau -> alloedOrigins), on la laisse
        if(allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        //Sinon, on affiche une erreur
        } else {
            callback(new Error('Non autorisé par CORS'))
        }
    },
    credentials : true,
    optionSuccessStatus : 200
}

module.exports = corsOptions