//Import des librairies et fichier
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


//On définit le schema de données que l'on souhaite pour nos users
const userSchema = mongoose.Schema({
    firstName : {
        type : String,
        trim : true,
        required : true
    },
    lastName : {
        type : String,
        trim : true,
        required : true
    },
    email : {
        type : String,
        trim : true,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
    },
    role : {
        type : String,
        required : true,
    },
    sector : {
        type : String,
        required : true,
    }
}, {timestamps : true})

//Comparer le mot de passe entré par l'utilisatur avec celui de la bdd (pour le login)
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password) //this.password c'est le mdp qui vient d'être entré par le user
}//Le return va soit retourner true donc c'est bon soit false donc ça ne passe pas

//Crypter le mot de passe de l'utilisateur lors de l'inscription
userSchema.pre('save', async function (next) { //Avant(pre) d'enregistrer la donnée dans la bdd
    //Si le mot de passe existe, mais n'est pas modifier, on ne fait rien
    if(!this.isModified('password')) {
        next()
    }

    //Si le mot de passe n'existe pas ou est modifié, on le crypte et on l'enregistre
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

module.exports = mongoose.model('User', userSchema)