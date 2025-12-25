//Import des librairies et fichiers
const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

// @route Route User (POST) /api/user/register
// @desc Route pour créer un utilisateur (inscription sur le frontend)
// @access Private (admin)
router.route('/register').post(userController.register)

// @route Route User (POST) /api/user/login
// @desc Route pour connecter un utilisateur (connection sur le frontend)
// @access Public
router.route('/login').post(userController.login)

// @route Route User (POST) /api/user/logout
// @desc Route pour déconnecter un utilisateur (logout sur le frontend)
// @access Private
router.route('/logout').post(userController.logout)

// @route Route User (GET) /api/user/profile:_id
// @desc Route pour récupérer les informations d'un utilisateur (onglet profile sur le frontend)
// @access Private
router.route('/profile:_id').get(userController.getProfile)

// @route Route User (PUT) /api/user/profile
// @desc Route pour modifier les informations d'un utilisateur qui est connecté (onglet profile sur le frontend)
// @access Private
router.route('/profile').put(userController.updateProfile)

// @route Route User (PUT) /api/user/userProfile
// @desc Route pour modifier les informations d'un utilisateur (onglet admin sur le frontend)
// @access Private
router.route('/updateUser/:id').put(userController.updateUser)

// @route Route User (GET)
// @desc Route pour obtenir tous les produits de la BDD
// @access Public
router.route('/getUsers').get(userController.getUsers)

// @route Route User (GET)
// @desc Route pour obtenir un produit de la BDD via son ID
// @access Public
router.route('/getAUser/:id').get(userController.getAUser)


//Export des routes
module.exports = router