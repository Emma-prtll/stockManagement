const jwt = require('jsonwebtoken')
const handler = require('express-async-handler')
const User = require('../models/userModel')

// Fonction to protect certaines routes
const protect = handler ( async (req, res, next) => {
    // Stock the cookie in the "token" variable
    let token
    token = req.cookies.jwt

    if(token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.userId).select('-password')
            next()
        } catch (err) {
            console.log(err)
            throw new Error('Not authorized, token expired.')
        }
    } else {
        res.status(401)
        throw new Error('Not authorized, token expired.')
    }
})

//Export de la fonction
module.exports = {
    protect
}