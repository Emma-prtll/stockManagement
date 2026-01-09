//Import des librairies et fichiers
const express = require('express')
const router = express.Router()
const carController = require('../controllers/carController')

// @route Route Car (POST)
// @desc Route pour créer un produit (formulaire sur le frontend)
// @access Private (admin)
router.route('/addItem').post(carController.addItem)

// @route Route Car (PUT)
// @desc Route pour modifier un produit dans la BDD depuis son ID
// @access Private (admin)
// router.route('/updateItem').put(carController.updateItem) ANCIEN
router.route('/updateItem/:id').put(carController.updateItem)

// @route Route Car (DELETE)
// @desc Route pour supprimer un produit dans la BDD depuis son ID
// @access Private (admin)
// router.put('/deleteItem:_id', (req, res) => {
// })
router.route('/deleteItem/:id').delete(carController.deleteItem)


// @route Route Car (GET)
// @desc Route pour obtenir tous les produits de la BDD
// @access Public
router.route('/getCars').get(carController.getCars)


// @route Route Car (GET)
// @desc Route pour obtenir un produit de la BDD via son ID
// @access Public
router.route('/getACar/:id').get(carController.getACar)


//Export des routes
module.exports = router