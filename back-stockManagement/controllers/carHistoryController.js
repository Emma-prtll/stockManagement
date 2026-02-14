const handler = require('express-async-handler')
const carHistory = require("../models/carHistoryModel");

// @route Route Car Historic (GET)
// @desc Route to get ALL car historic
// @access Private (everyone when logged in)
const getCarsHistorical =  handler (async (req, res) => {
    const carsHistorique = await carHistory.find()
        .find()
        .populate("carId");
    res.status(200).json(carsHistorique)

    if (!carsHistorique) {
        res.status(404)
        throw new Error("No car history found !")
    }

})

// @route Route Car Historic (GET)
// @desc Route to get ONE car historic
// @access Private (everyone when logged in)
const getOneCarHistory = handler(async (req, res) => {
    const history = await carHistory
        .find({ carId: req.params.carId })
        .sort({ createdAt: 1 })

    if (!history) {
        res.status(404)
        throw new Error("No car history found for this car ID !")
    }

    res.status(200).json(history)
})

module.exports = {
    getCarsHistorical,
    getOneCarHistory
}