const express = require('express')
const router = express.Router()
const carHistoryController = require('../controllers/carHistoryController')

// @route Route Car (GET)
// @desc Route to get ALL cars historic
// @access Private
router.route('/getCarsHistorical').get(carHistoryController.getCarsHistorical)

// @route Route Car (GET)
// @desc Route to get ONE car historic
// @access Private
router.route('/getOneCarHistory/:carId').get(carHistoryController.getOneCarHistory)

module.exports = router