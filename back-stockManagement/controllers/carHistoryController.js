//Import des librairies et fichiers
const handler = require('express-async-handler')
// const carHistoryModel = require('../models/carHistoryModel')
const Car = require('../models/carModel')
const carHistory = require("../models/carHistoryModel");

const getCarsHistorique =  handler (async (req, res) => {
    const carsHistorique = await carHistory.find()
    res.status(200).json(carsHistorique)
})

module.exports = {
    getCarsHistorique
}