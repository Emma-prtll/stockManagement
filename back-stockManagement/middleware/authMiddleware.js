//Import des librairies et fichiers
const jwt = require('jsonwebtoken')
const handler = require('express-async-handler')
const User = require('../models/userModel')

//Fonction pour protéger l'accès à certaines routes
const protect = handler ( async (req, res, next) => {
    //Dans la requête, il y aura le cookie qu'on passe et qui s'appelle "jwt", on stock le cookie en entiers dans "token"
    let token
    token = req.cookies.jwt

    if(token) {
        try {
            //User existe et est autorisé
            const decoded = jwt.verify(token, process.env.JWT_SECRET) //Dans decoded, on a le token décodé donc l'id du user
            req.user = await User.findById(decoded.userId).select('-password') //.select veut dire qu'on sélectionne tout SAUF le mdp
            next() //Next permet de faire continuer le programme donc aller sur la route souhaitée
        } catch (err) {
            //User n'existe pas dans la bdd -> pas authorisé
            //Le user n'existe pas dans la bdd donc n'est pas reconnu dans pas authorisé
            console.log(err)
            throw new Error('Pas authorisé, erreur de token')
        }
    } else {
        //User pas authorisé car pas de token
        res.status(401)
        throw new Error('Pas authorisé, erreur de token')
    }
})

//Export de la fonction
module.exports = {
    protect
}