//Importation de Mongoose (librairie MongoDB)
const mongoose = require('mongoose')

//On essaye de se connecter à MongoDB
//On retourne une erreur si ça échoue (affichée dasn le terminal WebStorm)
    //Fonction asynchrone pour ne pas tout bloquer tant qu'on à pas le résultat
const connectDB = async () => {
    try {
    await mongoose.connect(process.env.DATABASE_URI)
    } catch (err) {
        console.log(err)
    }
}

//On exporte la fonction qu'on vient de créer
module.exports = connectDB