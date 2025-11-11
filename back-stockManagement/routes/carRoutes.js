//Import des librairies et fichiers
const express = require('express')
const router = express.Router()

// @route Route Car (POST)
// @desc Route pour créer un produit (formulaire sur le frontend)
// @access Private (admin)
router.post('/', (req, res) => {

})

// @route Route Car (PUT)
// @desc Route pour modifier un produit dans la BDD depuis son ID
// @access Private (admin)
router.put('/:_id', (req, res) => {

})

// @route Route Car (DELETE)
// @desc Route pour supprimer un produit dans la BDD depuis son ID
// @access Private (admin)
router.put('/:_id', (req, res) => {

})

// @route Route Car (GET)
// @desc Route pour obtenir tous les produits de la BDD
// @access Public
router.get('/', (req, res) => {

})

// @route Route Car (GET)
// @desc Route pour obtenir tous les produits de la BDD avec le même nom
// @access Public
router.get('/:name', (req, res) => {

})

// @route Route Car (GET)
// @desc Route pour obtenir un produit de la BDD via son ID
// @access Public
//le single sert à d'avantage différencier la route de cette de :name et donc éviter les conflits
router.get('/single:_id', (req, res) => {

})


//Export des routes
module.exports = router