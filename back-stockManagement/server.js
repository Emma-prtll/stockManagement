//Import des librairies et fichiers
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const connectDB = require('./config/dbConnection')
const corsOptions = require('./config/corsOptions')
//Variable de configuration | certain nécessite d'être configuré
const app = express()
const PORT = process.env.PORT || 8000 //Si le port définit dans le .env est boucher, on lui donne un autre
require('dotenv').config()

//Connection à la base de données
connectDB()

//configuration du serveur
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended: false })) //On explique qu'il va recevoir des informations par l'URL et qu'il devra les accepters

//Route utilisée pour les users
//On lui dit que quand il reçoit /api/user il doit aller dans userRoutes.js
app.use('/api/user', require('./routes/userRoutes'))
//Route utilisée pour les voitures
app.use('/api/car', require('./routes/carRoutes'))
//Route utilisée pour les historiques de voitures
app.use('/api/carHistory', require('./routes/carHistoryRoutes'))

//On essaye de se connecter à la BDD de Mongo
//Si la base de donnée n'est pas atteignable, on ne lance pas le serveur
mongoose.connection.once('open', () => {
    //Ici, on a réussi à se connecter, on affiche un message dans la console du terminal
    app.listen(PORT, () => {
        console.log(`Serveur lancé sur le port ${PORT}`)
    })
})

//Si on a un problème de connexion, on affiche l'erreur dans le terminal
mongoose.connection.on('error', err => {
    console.log(`Erreur de connexion Mongo: ${err}`)
})