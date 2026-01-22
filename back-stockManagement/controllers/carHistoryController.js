//Import des librairies et fichiers
const handler = require('express-async-handler')
// const carHistoryModel = require('../models/carHistoryModel')
const carHistory = require("../models/carHistoryModel");

const getCarsHistorical =  handler (async (req, res) => {
    const carsHistorique = await carHistory.find()
        .find()
        .populate("carId");
    res.status(200).json(carsHistorique)
})

module.exports = {
    getCarsHistorical
}