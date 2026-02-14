const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const connectDB = require('./config/dbConnection')
const corsOptions = require('./config/corsOptions')

// Variable for configuration | some need to be configured
const app = express()
const PORT = process.env.PORT || 8000 // If the port in the .env is full, it will use this one
require('dotenv').config()

// Database connection
connectDB()

// Server configuration
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended: false })) // Say that some infos will pass through the URL, need to be accepted

// Tell where to go depending of the user demande
//Route use for the users
app.use('/api/user', require('./routes/userRoutes'))
//Route use for the cars
app.use('/api/car', require('./routes/carRoutes'))
//Route use for the carHistory
app.use('/api/carHistory', require('./routes/carHistoryRoutes'))

//Try to connect to the Mongo DB, if not possible, the server won't start
mongoose.connection.once('open', () => {
    // Connection successful
    app.listen(PORT, () => {
        console.log(`Server has been start on ${PORT}`)
    })
})

//If there is a problem with the connection, informe in the console
mongoose.connection.on('error', err => {
    console.log(`Connexion probleme on MongoDB: ${err}`)
})