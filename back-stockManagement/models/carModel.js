//Import des librairies et fichier
const mongoose = require('mongoose')

//On définit le schema de données que l'on souhaite pour nos users
const carShema = mongoose.Schema({
    brand: {
        type: String,
        trim: true,
        required: true,
    },
    model: {
        type: String,
        trim: true,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
}, {timestamps: true})

module.exports = mongoose.model('Car', carShema)
