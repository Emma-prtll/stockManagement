//Import des librairies et fichiers
const express = require('express')
const router = express.Router()
const carHistoryController = require('../controllers/carHistoryController')
const carController = require("../controllers/carController");

// @route Route Car (GET)
// @desc Route pour obtenir tous les produits de la BDD
// @access Public
router.route('/getCarsHistorical').get(carHistoryController.getCarsHistorical)

//Export de le route
module.exports = router