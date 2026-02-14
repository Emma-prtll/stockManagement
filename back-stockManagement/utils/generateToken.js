const jsw = require('jsonwebtoken')

//Fonction to generate a security token and put it in a cookie that will be sent to the frontend
//This function must take as a parameter the result and the userId
const generateToken = (res, userId) => {
    //Generation of the jsw token
    const token = jsw.sign({userId}, process.env.JWT_SECRET, {
        expiresIn : '30d' //Validation of the token for 30 days
    })

    //Creation of the cookie for the frontend
    res.cookie('jwt', token, {
        httpOnly: true,
        secure : process.env.NODE_ENV !== 'developpement', //To use a httpsCookie in dev mode
        sameSite : 'strict', //To not have the site open on two devices at the same time
        maxAge : 30 * 24 * 60 * 1000 //= 30 days
    })
}

module.exports = {generateToken}