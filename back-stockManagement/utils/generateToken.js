//Import des librairies et fichiers
const jsw = require('jsonwebtoken')

//Fonction pour gérer un token de sécurité et le mettre dans un cookie qui sera envoyé au frontend
//Cette fonction doit prendre en paramètre le résultat et le userId
const generateToken = (res, userId) => {
    //Générer le token jsw
    const token = jsw.sign({userId}, process.env.JWT_SECRET, {
        expiresIn : '30d' //Validité du token pdt 30 jours
    })

    //On crée le cookie pour le frontend
    res.cookie('jwt', token, {
        httpOnly: true,
        secure : process.env.NODE_ENV !== 'developpement', //Pour utiliser un httpsCookie en mode dev
        sameSite : 'strict', //Dire qu'on ne peut pas avoir le site ouvert sur deux appareils en même temps
        maxAge : 30 * 24 * 60 * 1000 // = 30 jours | temps de vie du cookie
    })
}

//Export de la fonction
module.exports = {generateToken}