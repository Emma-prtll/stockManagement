//Import des librairies et fichier
const mongoose = require('mongoose')

//On définit le schema de données que l'on souhaite pour nos users
const carHistorySchema = mongoose.Schema({
    carId: {
        //Lien avec le Schema car pour récupérer l'id de la voiture
        type: mongoose.Schema.Types.ObjectId,
        ref: "Car",
        required: true,
    },
    currentStock: {
        type: Number,
        required: true,
    },

}, {timestamps: true})



module.exports = mongoose.model(
    "CarStockHistory",
    carHistorySchema
);